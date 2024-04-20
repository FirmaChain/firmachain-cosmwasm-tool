import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { BURN_FROM_LOADING, BURN_FROM_SUCCESS } from "constants/message";
import { useBurnFromBulk } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { IBurnFromBulkTarget } from "interfaces/cw20";
import { useModal } from "hooks/useTxModal";
import { getBurnFromBulkFee } from "../tx/burnFromBulk";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const BurnFromBulk = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [owner, setOwner] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const { mutate, isLoading } = useBurnFromBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: BURN_FROM_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: BURN_FROM_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? BURN_FROM_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(owner === "" || amount === "");
    return isActive;
  }, [owner, amount]);

  const onChangeOwner = (value: string) => {
    setOwner(value);
  }

  const onChangeAmount = (value: string) => {
    setAmount(value);
  }

  const onClickBurnFrom = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
      const splitOwnerArray = owner.split(",").map(tokenId => tokenId.trim());
  
      const maxLength = Math.max(splitAmountArray.length, splitOwnerArray.length);
      const mergedArray: IBurnFromBulkTarget[] = [];
  
      for (let i = 0; i < maxLength; i++) {
        const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
        const owner = splitOwnerArray[i] || "";
        mergedArray.push({ amount, owner });
      }
      const fee = await getBurnFromBulkFee({ firmaSDK, wallet, contractAddress, burnFromBulkTargets: mergedArray });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"BurnFromBulk"} />
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
    const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
    const splitOwnerArray = owner.split(",").map(tokenId => tokenId.trim());

    const maxLength = Math.max(splitAmountArray.length, splitOwnerArray.length);
    const mergedArray: IBurnFromBulkTarget[] = [];

    for (let i = 0; i < maxLength; i++) {
      const amount = adjustValueByDecimal(splitAmountArray[i], Cw20Decimal) || "";
      const owner = splitOwnerArray[i] || "";
      mergedArray.push({ amount, owner });
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
        title={"BurnFromBulk"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"ADDR,ADDR,ADDR..."} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"BurnFromBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} placeholder={"AMOUNT,AMOUNT,AMOUNT..."} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN"} active={active} onClick={onClickBurnFrom} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default BurnFromBulk;