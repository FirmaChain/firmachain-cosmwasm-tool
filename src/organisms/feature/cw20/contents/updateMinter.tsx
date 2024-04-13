import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { UPDATE_MINTER_LOADING, UPDATE_MINTER_SUCCESS } from "constants/message";
import { useUpdateMinter } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { getUpdateMinterFee } from "../tx/updateMinter";
import { useModal } from "hooks/useTxModal";
import { formatNumberWithComma } from "utils/number";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const UpdateMinter = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [newMinter, setNewMinter] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useUpdateMinter(firmaSDK, wallet, contractAddress, newMinter, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: UPDATE_MINTER_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: UPDATE_MINTER_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw20");
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? UPDATE_MINTER_LOADING : undefined });
  }, [isLoading]);

  const checkNewMinter = useMemo(() => {
    return newMinter === "" ? true : FirmaUtil.isValidAddress(newMinter);
  }, [newMinter]);

  const active = useMemo(() => {
    const isActive = Boolean(newMinter === "" || checkNewMinter === false);
    return isActive;
  }, [newMinter, checkNewMinter]);

  const onChangeNewMinter = (value: string) => {
    setNewMinter(value);
  };

  const onClickUpdateMinter = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getUpdateMinterFee({ firmaSDK, wallet, contractAddress, new_minter: newMinter });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"UpdateMinter"} />
            <LabelDisplay label={"My Address"} value={shortenAddress(address)} />
            <AmountDisplay label={"My Fct"} amount={formatNumberWithComma(balance, 6)} symbol={"FCT"} />
            <AmountDisplay label={"Fee"} amount={formatNumberWithComma(fee.toString(), 6)} symbol={"FCT"} />
          </Stack>
        </Fragment>,
        onClickConfirm,
        onClickCancel
      );
    } catch (error) {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  };

  const onClickConfirm = () => {
    mutate(null);
  };

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  };

  return (
    <Fragment>
      <CustomRow
        title={"UpdateMinter"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={newMinter} type={"text"} placeholder={"NEW MINTER ADDR"} checkValue={checkNewMinter} onChange={onChangeNewMinter} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"UPDATE"} active={active} onClick={onClickUpdateMinter} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default UpdateMinter;