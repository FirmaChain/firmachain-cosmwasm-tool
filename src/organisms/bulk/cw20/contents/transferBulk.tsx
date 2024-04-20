import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import LoadingProgress from "components/loading/loadingProgress";

import { useTransferBulk } from "hooks/cw20/transaction";
import { TRANSFER_LOADING, TRANSFER_SUCCESS } from "constants/message";
import { GlobalActions } from "store/action";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { ITransferBulkTarget } from "interfaces/cw20";
import { useModal } from "hooks/useTxModal";
import { getTransferBulkFee } from "../tx/transferBulk";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
};

const TransferBulk = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { openModal, closeModal } = useModal();
  
  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const { mutate, isLoading } = useTransferBulk(firmaSDK, wallet, contractAddress, {
    onMutate: (variables: any) => {
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
      GlobalActions.handleRefetch("Cw20");
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? TRANSFER_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(recipient === "" || amount === "");
    return isActive;
  }, [recipient, amount]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  }

  const onChangeAmount = (value: string) => {
    setAmount(value);
  }

  const onClickTranfer = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
      const splitRecipientArray = recipient.split(",").map(tokenId => tokenId.trim());

      const maxLength = Math.max(splitAmountArray.length, splitRecipientArray.length);
      const mergedArray: ITransferBulkTarget[] = [];
    
      for (let i = 0; i < maxLength; i++) {
        const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
        const recipient = splitRecipientArray[i] || "";
        mergedArray.push({ amount, recipient });
      }

      const fee = await getTransferBulkFee({ firmaSDK, wallet, contractAddress, transferBulkTargets: mergedArray });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"TransferBulk"} />
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
    const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
    const splitRecipientArray = recipient.split(",").map(tokenId => tokenId.trim());

    const maxLength = Math.max(splitAmountArray.length, splitRecipientArray.length);
    const mergedArray: ITransferBulkTarget[] = [];
  
    for (let i = 0; i < maxLength; i++) {
      const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
      const recipient = splitRecipientArray[i] || "";
      mergedArray.push({ amount, recipient });
    }
    
    mutate(mergedArray);
  };

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  };

  return (
    <Fragment>
      <CustomRow
        title={"TransferBulk"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"ADDR,ADDR,ADDR..."} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} placeholder={"AMOUNT,AMOUNT,AMOUNT..."} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"TRANSFER"} active={active} onClick={onClickTranfer} />
              </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default TransferBulk;