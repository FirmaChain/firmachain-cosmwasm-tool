import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { TRANSFER_LOADING, TRANSFER_SUCCESS } from "constants/message";
import { useTransferBulk } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import { Stack } from "@mui/material";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { ITransferBulkTarget } from "interfaces/cw721";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
}

const TransferBulk = ({ firmaSDK, wallet, contractAddress }: IProps) => {
  const [recipients, setRecipients] = useState<string>("");
  const [token_ids, setToken_ids] = useState<string>("");

  const { mutate, isLoading } = useTransferBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
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
      GlobalActions.handleRefetch("Cw721");
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? TRANSFER_SUCCESS : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || recipients === "" || token_ids === "");
    return isActive;
  }, [contractAddress, recipients, token_ids]);

  const onChangeRecipients = (value: string) => {
    setRecipients(value);
  };

  const onChangeTokenIds = (value: string) => {
    setToken_ids(value);
  };

  const onClickTransferBulk = () => {
    const splitRecipientArray = recipients.split(",").map(value => value.trim());
    const splitTokenIdArray = token_ids.split(",").map(value => value.trim());

    const maxLength = Math.max(splitRecipientArray.length, splitTokenIdArray.length);
    const mergedArray: ITransferBulkTarget[] = [];
  
    for (let i = 0; i < maxLength; i++) {
      const recipient = splitRecipientArray[i] || "";
      const token_id = splitTokenIdArray[i] || "";
      mergedArray.push({ recipient, token_id });
    }

    mutate(mergedArray);
  }

  return (
    <Fragment>
      <CustomRow
        title={"TransferBulk"}
        merge={true}
        rowSpan={2}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={recipients} placeholder={"ADDR,ADDR,ADDR..."} onChange={onChangeRecipients} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"TransferBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_ids} placeholder={"ID,ID,ID..."} onChange={onChangeTokenIds} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"TRANSFER"} active={active} onClick={onClickTransferBulk} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default TransferBulk;