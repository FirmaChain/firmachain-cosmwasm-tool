import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import LoadingProgress from "components/loading/loadingProgress";
import CustomRow from "components/table/row/customRow";
import Toast from "components/toast";
import { UPDATE_LOGO_LOADING, UPDATE_LOGO_SUCCESS } from "constants/message";
import { useUpdateLogo } from "hooks/cw20/transaction";
import { GlobalActions } from "store/action";
import { getUpdateLogoFee } from "../tx/updateLogo";
import { useModal } from "hooks/useTxModal";
import { formatNumberWithComma } from "utils/number";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";
import { shortenAddress } from "utils/address";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  address: string;
  contractAddress: string;
}

const UpdateLogo = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [logo, setLogo] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useUpdateLogo(firmaSDK, wallet, contractAddress, logo, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: UPDATE_LOGO_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: UPDATE_LOGO_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? UPDATE_LOGO_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean(logo === "");
    return isActive;
  }, [logo]);

  const onChangeLogo = (value: string) => {
    setLogo(value);
  };

  const onClickUpdateLogo = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getUpdateLogoFee({ firmaSDK, wallet, contractAddress, url: logo});

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"UpdateLogo"} />
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
        title={"UpdateLogo"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={logo} type={"text"} placeholder={"URL (LOGO)"} onChange={onChangeLogo} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"UPDATE"} active={active} onClick={onClickUpdateLogo} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default UpdateLogo;