import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { BURN_LOADING, BURN_SUCCESS } from "constants/message";
import { useBurn, useBurnBulk } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import { Stack } from "@mui/material";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
}

const BurnBulk = ({ firmaSDK, wallet, contractAddress }: IProps) => {
  const [token_id, setToken_id] = useState<string>("");

  const { mutate, isLoading } = useBurnBulk(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: BURN_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: BURN_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? BURN_SUCCESS : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || token_id === "");
    return isActive;
  }, [contractAddress, token_id]);

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onClickBurnBulk = () => {
    const splitTokenIdArray = token_id.split(",").map(value => value.trim());

    mutate(splitTokenIdArray);
  }

  return (
    <Fragment>
      <CustomRow
        title={"BurnBulk"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} placeholder={"ID,ID,ID..."} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"BURN"} active={active} onClick={onClickBurnBulk} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default BurnBulk;