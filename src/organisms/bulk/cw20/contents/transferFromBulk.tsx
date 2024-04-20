import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import LoadingProgress from "components/loading/loadingProgress";

import { useTransferFrom, useTransferFromBulk } from "hooks/cw20/transaction";
import { TRANSFER_FROM_LOADING, TRANSFER_FROM_SUCCESS } from "constants/message";
import { GlobalActions } from "store/action";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { ITransferFromBulkTarget } from "interfaces/cw20";
import { useModal } from "hooks/useTxModal";
import { getTransferFromBulkFee } from "../tx/transferFromBulk";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
};

const TransferFromBulk = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [owner, setOwner] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const { mutate, isLoading } = useTransferFromBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: TRANSFER_FROM_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: TRANSFER_FROM_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? TRANSFER_FROM_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(owner === "" || recipient === "" || amount === "");
    return isActive;
  }, [owner, recipient, amount]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  }

  const onChangeAmount = (value: string) => {
    setAmount(value);
  }

  const onChangeOwner = (value: string) => {
    setOwner(value);
  }

  const onClickTranferFrom = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const splitOwnerArray = owner.split(",").map(tokenId => tokenId.trim());
      const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
      const splitRecipientArray = recipient.split(",").map(tokenId => tokenId.trim());
  
      const maxLength = Math.max(splitOwnerArray.length, splitAmountArray.length, splitRecipientArray.length);
      const mergedArray: ITransferFromBulkTarget[] = [];
    
      for (let i = 0; i < maxLength; i++) {
        const owner = splitOwnerArray[i] || "";
        const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
        const recipient = splitRecipientArray[i] || "";
        mergedArray.push({ owner, amount, recipient });
      }

      const fee = await getTransferFromBulkFee({ firmaSDK, wallet, contractAddress, transferFromBulkTargets: mergedArray });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"TransferFromBulk"} />
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
    const splitOwnerArray = owner.split(",").map(tokenId => tokenId.trim());
    const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
    const splitRecipientArray = recipient.split(",").map(tokenId => tokenId.trim());

    const maxLength = Math.max(splitOwnerArray.length, splitAmountArray.length, splitRecipientArray.length);
    const mergedArray: ITransferFromBulkTarget[] = [];
  
    for (let i = 0; i < maxLength; i++) {
      const owner = splitOwnerArray[i] || "";
      const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
      const recipient = splitRecipientArray[i] || "";
      mergedArray.push({ owner, amount, recipient });
    }

    console.log(mergedArray);
    mutate(mergedArray);
  };

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  };

  return (
    <Fragment>
      <CustomRow
        title={"TransferFromBulk"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"OWNER ADDR,ADDR,ADDR..."} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferFromBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"RECIPIENT ADDR,ADDR,ADDR..."} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferFromBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} placeholder={"AMOUNT,AMOUNT,AMOUNT..."} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"TRANSFER"} active={active} onClick={onClickTranferFrom} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default TransferFromBulk;