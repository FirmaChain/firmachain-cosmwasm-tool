import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { MINT_LOADING, MINT_SUCCESS } from "constants/message";
import { useMintBulk } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { IMintBulkTarget } from "interfaces/cw20";
import { useModal } from "hooks/useTxModal";
import { getMintBulkFee } from "../tx/mintBulk";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const MintBulk = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const { mutate, isLoading } = useMintBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: MINT_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: MINT_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? MINT_LOADING : undefined });
  }, [isLoading]);

  useEffect(() => {

  }, [recipient]);

  const active = useMemo(() => {
    const isActive = Boolean(recipient === "" || amount === "");
    return isActive;
  }, [recipient, amount]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  };

  const onChangeAmount = (value: string) => {
    setAmount(value);
  };

  const onClickMint = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
      const splitRecipientArray = recipient.split(",").map(tokenId => tokenId.trim());
  
      const maxLength = Math.max(splitAmountArray.length, splitRecipientArray.length);
      const mergedArray: IMintBulkTarget[] = [];
  
      for (let i = 0; i < maxLength; i++) {
        const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
        const recipient = splitRecipientArray[i] || "";
        mergedArray.push({ amount, recipient });
      }
      const fee = await getMintBulkFee({ firmaSDK, wallet, contractAddress, mintBulkTargets: mergedArray });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"MintBulk"} />
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
    const mergedArray: IMintBulkTarget[] = [];

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
        title={"MintBulk"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"ADDR,ADDR,ADDR..."} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}></Stack>
          </Stack>
        }
      />
      <CustomRow
        title={"MintBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} placeholder={"AMOUNT,AMOUNT,AMOUNT..."} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"MINT_B"} active={active} onClick={onClickMint} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default MintBulk;