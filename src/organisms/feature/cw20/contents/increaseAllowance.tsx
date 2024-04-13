import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Expires, FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import CustomRadioGroup from "components/radio/customRadio";
import CustomRow from "components/table/row/customRow";
import { useIncreaseAllowance } from "hooks/cw20/transaction";
import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";

import { INCREASE_ALLOWANCE_LOADING, INCREASE_ALLOWANCE_SUCCESS } from "constants/message";
import { GlobalActions } from "store/action";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { rootState } from "store/reducers";
import DatePicker from "components/input/datePicker";
import { getIncreaseAllowance } from "../tx/increaseAllowance";
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

const EXPIRES = ["AT_HEIGHT", "AT_TIME", "NEVER"];
enum EXPIRE_TYPES {
  AT_HEIGHT = 0,
  AT_TIME = 1,
  NEVER = 2
}

const IncreaseAllowance = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [spender, setSpender] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [selectExpireType, setSelectExpireType] = useState<number>(EXPIRE_TYPES.AT_HEIGHT);
  const [expireValue, setExpireValue] = useState<number>(0);
  const [expires, setExpires] = useState<Expires>(null);

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useIncreaseAllowance(firmaSDK, wallet, contractAddress, spender, adjustValueByDecimal(amount, Cw20Decimal), expires, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: INCREASE_ALLOWANCE_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: INCREASE_ALLOWANCE_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? INCREASE_ALLOWANCE_LOADING : undefined });
  }, [isLoading]);

  const checkSpender = useMemo(() => {
    return spender === "" ? true : FirmaUtil.isValidAddress(spender);
  }, [spender]);

  const active = useMemo(() => {
    if (selectExpireType === 2) {
      setExpireValue(0);
    }

    const isActive = Boolean(spender === "" || amount <= 0 || (selectExpireType !== 2 && expireValue <= 0) || checkSpender === false);
    return isActive;
  }, [spender, amount, selectExpireType, expireValue, checkSpender]);

  const onChangeSpender = (value: string) => {
    setSpender(value);
  };

  const onChangeAmount = (value: number) => {
    setAmount(value);
  };

  const onChangeExpireTypes = (value: number) => {
    setSelectExpireType(value);
  };

  const onChangeExpireValue = (value: number | any) => {
    switch (selectExpireType) {
      case EXPIRE_TYPES.AT_HEIGHT: setExpires({ at_height: Number(value) }); break;
      case EXPIRE_TYPES.AT_TIME:
        const date = new Date(value.toString());
        const unixTimestamp = Math.floor(date.getTime() / 1000);
        setExpires({ at_time: unixTimestamp.toString() });
        break;
      case EXPIRE_TYPES.NEVER: setExpires({ never: {} }); break;
    }

    setExpireValue(value);
  };

  const onClickIncreaseAllowance = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getIncreaseAllowance({ firmaSDK, wallet, contractAddress, spender, amount: formatAmount, expires });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"IncreaseAllowance"} />
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
  }

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
  }

  return (
    <Fragment>
      <CustomRow
        title={"IncreaseAllowance"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={spender} placeholder={"SPENDER ADDR"} checkValue={checkSpender} onChange={onChangeSpender} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}></Stack>
          </Stack>
        }
      />
      <CustomRow
        title={"IncreaseAllowance"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}></Stack>
          </Stack>
        }
      />
      <CustomRow
        title={"IncreaseAllowance"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"column"} gap={"0px"}>
            <CustomRadioGroup enumValues={EXPIRES} selectedValue={selectExpireType} onChange={onChangeExpireTypes} />
            <Stack flexDirection={"row"} gap={"10px"}>
              {selectExpireType === EXPIRE_TYPES.AT_HEIGHT && <TextInput value={expireValue} type={"number"} placeholder={"7216240 (BLOCK HEIGHT)"} onChange={onChangeExpireValue} />}
              {selectExpireType === EXPIRE_TYPES.AT_TIME && <DatePicker onChange={onChangeExpireValue} />}
              {selectExpireType === EXPIRE_TYPES.NEVER && <TextInput value={0} type={"number"} placeholder={"NEVER"} readOnly={true} onChange={onChangeExpireValue} />}
              <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"Allowance"} active={active} onClick={onClickIncreaseAllowance} />
              </Stack>
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default IncreaseAllowance;