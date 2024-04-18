import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { SEND_NFT_LOADING, SEND_NFT_SUCCESS } from "constants/message";
import { useSendNft } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const SendNft = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [targetContractAddress, setTargetContractAddress] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const { mutate, isLoading } = useSendNft(firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: SEND_NFT_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: SEND_NFT_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw721");
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? SEND_NFT_SUCCESS : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || targetContractAddress === "" || token_id === "");
    return isActive;
  }, [contractAddress, targetContractAddress, token_id, msg]);

  const onChangeTargetContractAddress = (value: string) => {
    setTargetContractAddress(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onChangeMsg = (value: string) => {
    setMsg(value);
  };

  const onClickSendNft = () => {
    mutate(null);
  }

  return (
    <Fragment>
      <CustomRow
        title={"SendNft"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={targetContractAddress} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeTargetContractAddress} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"SendNft"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} type={"number"} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"SendNft"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={msg} readOnly={true} placeholder={"UNABLE TO EXECUTE"} onChange={onChangeMsg} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"SEND"} active={active} onClick={onClickSendNft} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default SendNft;