import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import LoadingProgress from "components/loading/loadingProgress";

import { useTransfer } from "hooks/cw20/transaction";
import { TRANSFER_LOADING, TRANSFER_SUCCESS } from "constants/message";
import { GlobalActions } from "store/action";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { getTransferFee } from "../tx/transfer";
import { useModal } from "hooks/useTxModal";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
};

const Transfer = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useTransfer(firmaSDK, wallet, contractAddress, recipient, adjustValueByDecimal(amount, Cw20Decimal), {
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

  const checkRecipient = useMemo(() => {
    return recipient === "" ? true : FirmaUtil.isValidAddress(recipient);
  }, [recipient]);

  const active = useMemo(() => {
    const isActive = Boolean(recipient === "" || amount <= 0 || checkRecipient === false);
    return isActive;
  }, [recipient, amount, checkRecipient]);

  const onChangeRecipient = (value: string) => {
    setRecipient(value);
  };

  const onChangeAmount = (value: number) => {
    setAmount(value);
  };

  const onClickTranfer = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getTransferFee({ firmaSDK, wallet, contractAddress, recipient, amount: formatAmount });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Transfer"} />
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
        title={"Transfer"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"RECIPIENT ADDR"} checkValue={checkRecipient} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Transfer"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"TRANSFER"} active={active} onClick={onClickTranfer} />
              </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Transfer;