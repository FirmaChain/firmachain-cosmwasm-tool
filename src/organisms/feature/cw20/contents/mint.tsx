import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { MINT_LOADING, MINT_SUCCESS } from "constants/message";
import { useMint } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { getMintFee } from "../tx/mint";
import { useModal } from "hooks/useTxModal";
import AmountDisplay from "components/text/amountDisplay";
import LabelDisplay from "components/text/labelDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const Mint = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useMint(firmaSDK, wallet, contractAddress, recipient, adjustValueByDecimal(amount, Cw20Decimal), {
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

  const onClickMint = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getMintFee({ firmaSDK, wallet, contractAddress, recipient, amount: formatAmount });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Mint"} />
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
        title={"Mint"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipient} placeholder={"RECIPIENT ADDR"} checkValue={checkRecipient} onChange={onChangeRecipient} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}></Stack>
          </Stack>
        }
      />
      <CustomRow
        title={"Mint"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"MINT"} active={active} onClick={onClickMint} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default Mint;