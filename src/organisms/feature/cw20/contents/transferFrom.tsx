import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import LoadingProgress from "components/loading/loadingProgress";

import { useTransferFrom } from "hooks/cw20/transaction";
import { useModal } from "hooks/useTxModal";
import { TRANSFER_FROM_LOADING, TRANSFER_FROM_SUCCESS } from "constants/message";
import { GlobalActions } from "store/action";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { getTransferFromFee } from "../tx/transferFrom";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
};

const TransferFrom = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [owner, setOwner] = useState<string>("");

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useTransferFrom(firmaSDK, wallet, contractAddress, owner, recipient, adjustValueByDecimal(amount, Cw20Decimal), {
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

  const checkOwner = useMemo(() => {
    return owner === "" ? true : FirmaUtil.isValidAddress(owner);
  }, [owner]);

  const checkRecipient = useMemo(() => {
    return recipient === "" ? true : FirmaUtil.isValidAddress(recipient);
  }, [recipient]);

  const active = useMemo(() => {
    const isActive = Boolean(owner === "" || recipient === "" || amount <= 0 || checkOwner === false || checkRecipient === false);
    return isActive;
  }, [owner, recipient, amount, checkOwner, checkRecipient]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  };

  const onChangeAmount = (value: number) => {
    setAmount(value);
  };

  const onChangeOwner = (value: string) => {
    setOwner(value);
  };

  const onClickTranferFrom = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getTransferFromFee({ firmaSDK, wallet, contractAddress, owner, recipient, amount: formatAmount });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"TransferFrom"} />
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
        title={"TransferFrom"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"OWNER ADDR"} checkValue={checkOwner} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferFrom"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"RECIPIENT ADDR"} checkValue={checkRecipient} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferFrom"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"TRANSFER"} active={active} onClick={onClickTranferFrom} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default TransferFrom;