import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { TRANSFER_LOADING, TRANSFER_SUCCESS } from "constants/message";
import { useTransfer } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import { Stack, Typography } from "@mui/material";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { getTransferFee } from "../tx/transfer";
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

const Transfer = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useTransfer(firmaSDK, wallet, contractAddress, recipient, token_id, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: TRANSFER_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: TRANSFER_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? TRANSFER_SUCCESS : undefined });
  }, [isLoading]);

  const checkRecipient = useMemo(() => {
    return recipient === "" ? true : FirmaUtil.isValidAddress(recipient);
  }, [recipient]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || recipient === "" || token_id === "" || checkRecipient === false);
    return isActive;
  }, [contractAddress, recipient, token_id, checkRecipient]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onClickTransfer = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getTransferFee({ firmaSDK, wallet, contractAddress, recipient, token_id });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Transfer"} />
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
        title={"Transfer"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"ADDR"} checkValue={checkRecipient} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Transfer"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} type={"number"} placeholder={"TOKEN ID"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"TRANSFER"} active={active} onClick={onClickTransfer} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Transfer;