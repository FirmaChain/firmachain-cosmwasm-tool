import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import Toast from "components/toast";

import { GlobalActions } from "store/action";
import { useUpdateMarketing } from "hooks/cw20/transaction";
import { useModal } from "hooks/useTxModal";

import { formatNumberWithComma } from "utils/number";
import { shortenAddress } from "utils/address";

import { UPDATE_MARKETING_LOADING, UPDATE_MARKETING_SUCCESS } from "constants/message";
import { getUpdateMarketingFee } from "../tx/updateMarketing";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const UpdateMarketing = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {  
  const [description, setDescription] = useState<string>("");
  const [marketingAddress, setMarketingAddress] = useState<string>("");
  const [project, setProject] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useUpdateMarketing(firmaSDK, wallet, contractAddress, description, marketingAddress, project, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: UPDATE_MARKETING_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: UPDATE_MARKETING_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? UPDATE_MARKETING_LOADING : undefined });
  }, [isLoading]);

  const checkMarketingAddress = useMemo(() => {
    return marketingAddress === "" ? true : FirmaUtil.isValidAddress(marketingAddress);
  }, [marketingAddress]);

  const active = useMemo(() => {
    const isActive = Boolean(description === "" || marketingAddress === "" || project === "" || checkMarketingAddress === false);
    return isActive;
  }, [description, marketingAddress, project, checkMarketingAddress]);

  const onChangeDescription = (value: string) => {
    setDescription(value);
  };

  const onChangeMarketingAddress = (value: string) => {
    setMarketingAddress(value);
  };

  const onChangeProject = (value: string) => {
    setProject(value);
  };

  const onClickUpdateMarketing = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getUpdateMarketingFee({ firmaSDK, wallet, contractAddress, description, marketing: marketingAddress, project});

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"UpdateMarketing"} />
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
        title={"UpdateMarketing"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={description} placeholder={"TEXT (DESCRIPTION)"} onChange={onChangeDescription} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"UpdateMarketing"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={marketingAddress} placeholder={"MARKETING ADDR"} checkValue={checkMarketingAddress} onChange={onChangeMarketingAddress} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"UpdateMarketing"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={project} type={"text"} placeholder={"TEXT (PROJECT)"} onChange={onChangeProject} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"UPDATE"} active={active} onClick={onClickUpdateMarketing} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default UpdateMarketing;