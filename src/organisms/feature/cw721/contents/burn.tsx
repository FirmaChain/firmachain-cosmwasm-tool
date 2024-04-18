import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { BURN_LOADING, BURN_SUCCESS } from "constants/message";
import { useBurn } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import { Stack, Typography } from "@mui/material";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { useModal } from "hooks/useTxModal";
import { getBurnFee } from "../tx/burn";
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

const Burn = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [token_id, setToken_id] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useBurn(firmaSDK, wallet, contractAddress, token_id, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: BURN_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: BURN_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? BURN_SUCCESS : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || token_id === "");
    return isActive;
  }, [contractAddress, token_id]);

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onClickBurn = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getBurnFee({ firmaSDK, wallet, contractAddress, token_id });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Burn"} />
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
  }

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
        title={"Burn"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} type={"number"} placeholder={"TOKEN ID"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN"} active={active} onClick={onClickBurn} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Burn;