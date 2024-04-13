import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import Toast from "components/toast";

import { GlobalActions } from "store/action";
import { rootState } from "store/reducers";
import { useBurn } from "hooks/cw20/transaction";
import { useModal } from "hooks/useTxModal";

import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { shortenAddress } from "utils/address";
import { BURN_LOADING, BURN_SUCCESS } from "constants/message";

import { getBurnFee } from "../tx/burn";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const Burn = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [amount, setAmount] = useState<number>(0);

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useBurn(firmaSDK, wallet, contractAddress, adjustValueByDecimal(amount, Cw20Decimal), {
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
    const isActive = Boolean(amount <= 0);
    return isActive;
  }, [amount]);

  const onChangeAmount = (value: number) => {
    setAmount(value);
  };

  const onClickBurn = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const formatAmount = adjustValueByDecimal(amount, Cw20Decimal);
      const fee = await getBurnFee({ firmaSDK, wallet, contractAddress, amount: formatAmount });
      
      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Burn"} />
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
        title={"Burn"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} placeholder={"AMOUNT"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN"} active={active} onClick={onClickBurn} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default Burn;