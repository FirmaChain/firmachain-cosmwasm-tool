import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { BURN_LOADING, BURN_SUCCESS } from "constants/message";
import { useBurnBulk } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { rootState } from "store/reducers";
import { useSelector } from "react-redux";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { getBurnBulkFee } from "../tx/burnBulk";
import { useModal } from "hooks/useTxModal";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const BurnBulk = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [amount, setAmount] = useState<string>("");
  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useBurnBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: BURN_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: BURN_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: (data: any) => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw20");
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? BURN_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(amount === "");
    return isActive;
  }, [amount]);

  const onChangeAmount = (value: string) => {
    setAmount(value);
  }

  const onClickBurn = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
      let amountArray = [];
      for (const splitAmount of splitAmountArray) {
        const resultAmount = adjustValueByDecimal(splitAmount, Cw20Decimal);
        amountArray.push(resultAmount);
      };
      const fee = await getBurnBulkFee({ firmaSDK, wallet, contractAddress, amountArray });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"BurnBulk"} />
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
    let amountArray = [];
    const splitAmountArray = amount.split(",").map(tokenId => tokenId.trim());
    for (const splitAmount of splitAmountArray) {
      const resultAmount = adjustValueByDecimal(splitAmount, Cw20Decimal);
      amountArray.push(resultAmount);
    };
    
    mutate(amountArray);
  };

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  };

  return (
    <Fragment>
      <CustomRow
        title={"BurnBulk"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} placeholder={"AMOUNT,AMOUNT,AMOUNT..."} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN_B"} active={active} onClick={onClickBurn} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default BurnBulk;