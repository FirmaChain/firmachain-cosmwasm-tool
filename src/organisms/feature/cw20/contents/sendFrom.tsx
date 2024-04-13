import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";
import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { SEND_FROM_LOADING, SEND_FROM_SUCCESS } from "constants/message";
import { useSendFrom } from "hooks/cw20/transaction";
import { Fragment, useEffect, useMemo, useState } from "react";
import { GlobalActions } from "store/action";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const SendFrom = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [targetContractAddress, setTargetContractAddress] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<any>({});

  const { mutate, isLoading } = useSendFrom(firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount.toString(), message, {
    onMutate: (variables: any) => {
      LoadingProgress({ enable: true, message: SEND_FROM_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: SEND_FROM_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? SEND_FROM_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(targetContractAddress === "" || owner === "" || amount <= 0);
    return isActive;
  }, [targetContractAddress, owner, amount]);

  const onChangeTagetContractAddress = (value: string) => {
    setTargetContractAddress(value);
  }

  const onChangeOwner = (value: string) => {
    setOwner(value);
  }

  const onChangeAmount = (value: number) => {
    setAmount(value);
  }

  const onClickSendFrom = () => {
    const messageData = {};
    setMessage(messageData);

    mutate(null);
  }
  
  return (
    <Fragment>
      <CustomRow
        title={"SendFrom"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={targetContractAddress} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeTagetContractAddress} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"SendFrom"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"SendFrom"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={amount} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeAmount} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                <SmallButton title={"SEND"} active={active} onClick={onClickSendFrom} />
              </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default SendFrom;