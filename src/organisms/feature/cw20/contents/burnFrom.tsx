import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { BURN_FROM_LOADING, BURN_FROM_SUCCESS } from "constants/message";
import { useBurnFrom } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { getBurnFromFee } from "../tx/burnFrom";
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

const BurnFrom = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [owner, setOwner] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useBurnFrom(firmaSDK, wallet, contractAddress, owner, adjustValueByDecimal(amount, Cw20Decimal), {
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

  const checkOwner = useMemo(() => {
    return owner === "" ? true : FirmaUtil.isValidAddress(owner);
  }, [owner]);

  const active = useMemo(() => {
    const isActive = Boolean(owner === "" || amount <= 0 || checkOwner === false);
    return isActive;
  }, [owner, amount, checkOwner]);

  const onChangeOwner = (value: string) => {
    setOwner(value);
  }

  const onChangeAmount = (value: number) => {
    setAmount(value);
  }

  const onClickBurnFrom = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getBurnFromFee({ firmaSDK, wallet, contractAddress, owner, amount: adjustValueByDecimal(amount, Cw20Decimal)});

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"BurnFrom"} />
            <LabelDisplay label={"My Address"} value={shortenAddress(address)} />
            <AmountDisplay label={"My Fct"} amount={formatNumberWithComma(balance, 6)} symbol={"FCT"} />
            <AmountDisplay label={"Fee"} amount={formatNumberWithComma(fee.toString(), 6)} symbol={"FCT"} />
          </Stack>
        </Fragment>,
        onClickConfirm,
        onClickCancel
      )
    } catch (error) {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  };

  const onClickConfirm = () => {
    mutate(null);
  }

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  }
  
  return (
    <Fragment>
      <CustomRow
        title={"BurnFrom"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"OWNER ADDR"} checkValue={checkOwner} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"BurnFrom"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN"} active={active} onClick={onClickBurnFrom} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default BurnFrom;