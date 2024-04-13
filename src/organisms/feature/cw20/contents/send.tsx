import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";
import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { SEND_LOADING, SEND_SUCCESS } from "constants/message";
import { useSend } from "hooks/cw20/transaction";
import { Fragment, useEffect, useMemo, useState } from "react";
import { GlobalActions } from "store/action";
import { getSendFee } from "../tx/send";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const Send = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [targetContractAddress, setTargetContractAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<any>({});

  const { mutate, isLoading } = useSend(firmaSDK, wallet, contractAddress, targetContractAddress, amount.toString(), message, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: SEND_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: SEND_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw20");
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? SEND_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(targetContractAddress === "" || amount <= 0);
    return isActive;
  }, [targetContractAddress, amount]);

  const onChangeTagetContractAddress = (value: string) => {
    setTargetContractAddress(value);
  };

  const onChangeAmount = (value: number) => {
    setAmount(value);
  };

  const onClickSend = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getSendFee({ firmaSDK, wallet, contractAddress, targetContractAddress, amount: amount.toString(), message});
    } catch (error) {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  };

  return (
    <Fragment>
      <CustomRow
        title={"Send"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={targetContractAddress} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeTagetContractAddress} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Send"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} type={"number"} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"SEND"} active={active} onClick={onClickSend} />
              </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default Send;