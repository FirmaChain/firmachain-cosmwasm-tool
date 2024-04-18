import { Fragment, useEffect, useMemo, useState } from "react";
import { Expires, FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { APPROVE_LOADING, APPROVE_SUCCESS } from "constants/message";
import { useApprove } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import CustomRadioGroup from "components/radio/customRadio";
import { GlobalActions } from "store/action";
import DatePicker from "components/input/datePicker";
import { useModal } from "hooks/useTxModal";
import { getApproveFee } from "../tx/approve";
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

const EXPIRES = ["AT_HEIGHT", "AT_TIME", "NEVER"];
enum EXPIRE_TYPES {
  AT_HEIGHT = 0,
  AT_TIME = 1,
  NEVER = 2
}

const Approve = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [spender, setSpender] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");
  const [selectExpireType, setSelectExpireType] = useState<number>(EXPIRE_TYPES.AT_HEIGHT);
  const [expireValue, setExpireValue] = useState<number>(0);
  const [expires, setExpires] = useState<Expires>(null);

  const { openModal, closeModal } = useModal();
  
  const { mutate, isLoading } = useApprove(firmaSDK, wallet, contractAddress, spender, token_id, expires, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: APPROVE_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: APPROVE_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? APPROVE_SUCCESS : undefined });
  }, [isLoading]);

  const checkSpender = useMemo(() => {
    return spender === "" ? true : FirmaUtil.isValidAddress(spender);
  }, [spender]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || spender === "" || token_id === "" || (selectExpireType !== 2 && expireValue <= 0) || checkSpender === false);
    return isActive;
  }, [contractAddress, spender, token_id, selectExpireType, expireValue, checkSpender]);

  const onChangeSpender = (value: string) => {
    setSpender(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onChangeExpireTypes = (value: number) => {
    setSelectExpireType(value);
  };

  const onChangeExpireValue = (value: number) => {
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

  const onClickApprove = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getApproveFee({ firmaSDK, wallet, contractAddress, spender, token_id, expires });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Approve"} />
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
        title={"Approve"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={spender} placeholder={"ADDRESS"} checkValue={checkSpender} onChange={onChangeSpender} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Approve"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} type={"number"} placeholder={"TOKEN ID"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Approve"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"column"} gap={"0px"}>
            <CustomRadioGroup enumValues={EXPIRES} selectedValue={selectExpireType} onChange={onChangeExpireTypes} />
            <Stack flexDirection={"row"} gap={"10px"}>
              {selectExpireType === EXPIRE_TYPES.AT_HEIGHT && <TextInput value={expireValue} type={"number"} placeholder={"BLOCK HEIGHT"} onChange={onChangeExpireValue} />}
              {selectExpireType === EXPIRE_TYPES.AT_TIME && <DatePicker onChange={onChangeExpireValue} />}
              {selectExpireType === EXPIRE_TYPES.NEVER && <TextInput value={0} type={"number"} placeholder={"NEVER"} readOnly={true} onChange={onChangeExpireValue} />}
              <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"Approve"} active={active} onClick={onClickApprove} />
              </Stack>
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Approve;