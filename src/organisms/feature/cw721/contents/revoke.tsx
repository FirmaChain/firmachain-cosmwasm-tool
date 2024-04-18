import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { REVOKE_LOADING, REVOKE_SUCCESS } from "constants/message";
import { useRevoke } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { useModal } from "hooks/useTxModal";
import { getRevokeFee } from "../tx/revoke";
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

const Revoke = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [spender, setSpender] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useRevoke(firmaSDK, wallet, contractAddress, spender, token_id, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: REVOKE_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: REVOKE_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw721");
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? REVOKE_SUCCESS : undefined });
  }, [isLoading]);

  const checkSpender = useMemo(() => {
    return spender === "" ? true : FirmaUtil.isValidAddress(spender);
  }, [spender]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || spender === "" || token_id === "" || checkSpender === false);
    return isActive;
  }, [contractAddress, spender, token_id, checkSpender]);

  const onChangeSpender = (value: string) => {
    setSpender(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onClickRevoke = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getRevokeFee({ firmaSDK, wallet, contractAddress, spender, token_id });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Revoke"} />
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
        title={"Revoke"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={spender} placeholder={"ADDRESS"} checkValue={checkSpender} onChange={onChangeSpender} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Revoke"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} placeholder={"TOKEN ID"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"REVOKE"} active={active} onClick={onClickRevoke} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Revoke;