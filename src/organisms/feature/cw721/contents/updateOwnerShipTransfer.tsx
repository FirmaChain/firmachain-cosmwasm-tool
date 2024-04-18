import { Fragment, useEffect, useMemo, useState } from "react";
import { Expires, FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";

import LoadingProgress from "components/loading/loadingProgress";
import { UPDATE_OWNERSHIP_TRANSFER_LOADING, UPDATE_OWNERSHIP_TRANSFER_SUCCESS } from "constants/message";
import { useUpdateOwnerShipTransfer } from "hooks/cw721/transaction";
import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import { Stack } from "@mui/material";
import TextInput from "components/input/textInput";
import CustomRadioGroup from "components/radio/customRadio";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import DatePicker from "components/input/datePicker";
import { useModal } from "hooks/useTxModal";
import { getUpdateOwnerShipTransferFee } from "../tx/updateOwnerShipTransfer";
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

const UpdateOwnerShipTransfer = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [newOwner, setNewOwner] = useState<string>("");
  const [selectExpireType, setSelectExpireType] = useState<number>(EXPIRE_TYPES.AT_HEIGHT);
  const [expireValue, setExpireValue] = useState<number>(0);
  const [expires, setExpires] = useState<Expires>(null);

  const { openModal, closeModal } = useModal();
  
  const { mutate, isLoading } = useUpdateOwnerShipTransfer(firmaSDK, wallet, contractAddress, newOwner, expires, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: UPDATE_OWNERSHIP_TRANSFER_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: UPDATE_OWNERSHIP_TRANSFER_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? UPDATE_OWNERSHIP_TRANSFER_LOADING : undefined });
  }, [isLoading]);

  const checkNewOwner = useMemo(() => {
    return newOwner === "" ? true : FirmaUtil.isValidAddress(newOwner);
  }, [newOwner]);

  const active = useMemo(() => {
    if (selectExpireType === 2) {
      setExpireValue(0);
    }

    const isActive = Boolean(newOwner === "" || (selectExpireType !== 2 && expireValue <= 0) || checkNewOwner === false);
    return isActive;
  }, [newOwner, selectExpireType, expireValue, checkNewOwner]);

  const onChangeNewOwner = (value: string) => {
    setNewOwner(value);
  }

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

  const onClickUpdateOwnerShipTransfer = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getUpdateOwnerShipTransferFee({ firmaSDK, wallet, contractAddress, newOwner, expires });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"UpdateOwnerShipTransfer"} />
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
        title={"UpdateOwnerShipTransfer"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={newOwner} placeholder={"ADDRESS"} checkValue={checkNewOwner} onChange={onChangeNewOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}></Stack>
          </Stack>
        }
      />
      <CustomRow
        title={"UpdateOwnerShipTransfer"}
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
                <SmallButton title={"UPDATE"} active={active} onClick={onClickUpdateOwnerShipTransfer} />
              </Stack>
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default UpdateOwnerShipTransfer;