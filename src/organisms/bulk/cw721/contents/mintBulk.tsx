import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { MINT_LOADING, MINT_SUCCESS } from "constants/message";
import { useMintBulk } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { IMintBulkTarget } from "interfaces/cw721";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
}

const MintBulk = ({ firmaSDK, wallet, contractAddress }: IProps) => {
  const [owner, setOwner] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");
  const [token_uri, setToken_uri] = useState<string>("");
  
  const { mutate, isLoading } = useMintBulk(firmaSDK, wallet, contractAddress, {
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
      GlobalActions.handleRefetch("Cw721");
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? MINT_SUCCESS : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || owner === "" || token_id === "" || token_uri === "");
    return isActive;
  }, [contractAddress, owner, token_id, token_uri]);

  const onChangeOwner = (value: string) => {
    setOwner(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onChangeTokenUri = (value: string) => {
    setToken_uri(value);
  };

  const onClickMintBulk = () => {
    const splitOwnerArray = owner.split(",").map(value => value.trim());
    const splitTokenIdArray = token_id.split(",").map(value => value.trim());

    const maxLength = Math.max(splitOwnerArray.length, splitTokenIdArray.length);
    const mergedArray: IMintBulkTarget[] = [];
  
    for (let i = 0; i < maxLength; i++) {
      const owner = splitOwnerArray[i] || "";
      const token_id = splitTokenIdArray[i] || "";
      mergedArray.push({ owner, token_id, token_uri: `${token_uri}${token_id}` });
    }

    mutate(mergedArray);
  }

  return (
    <Fragment>
      <CustomRow
        title={"MintBulk"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"ADDR,ADDR,ADDR..."} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"MintBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} placeholder={"ID,ID,ID..."} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"MintBulk"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_uri} placeholder={"ex) https://firmachain.org/uri/"} onChange={onChangeTokenUri} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"MINT"} active={active} onClick={onClickMintBulk} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default MintBulk;