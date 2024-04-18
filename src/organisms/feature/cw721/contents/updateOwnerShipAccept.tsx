import { Fragment, useEffect, useMemo } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import { UPDATE_OWNERSHIP_ACCEPT_LOADING, UPDATE_OWNERSHIP_ACCEPT_SUCCESS } from "constants/message";
import { useUpdateOwnerShipAccept } from "hooks/cw721/transaction";
import Toast from "components/toast";
import CustomRow from "components/table/row/customRow";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { useModal } from "hooks/useTxModal";
import { getUpdateOwnerShipAcceptFee } from "../tx/updateOwnerShipAccept";
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

const UpdateOwnerShipAccept = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useUpdateOwnerShipAccept(firmaSDK, wallet, contractAddress, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: UPDATE_OWNERSHIP_ACCEPT_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: UPDATE_OWNERSHIP_ACCEPT_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw721");
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? UPDATE_OWNERSHIP_ACCEPT_LOADING : undefined });
  }, [isLoading]);

  const active = useMemo(() => {
    const isActive = Boolean();
    return isActive;
  }, []);

  const onClickUpdateOwnerShipAccept = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getUpdateOwnerShipAcceptFee({ firmaSDK, wallet, contractAddress });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"UpdateOwnerShipAccept"} />
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
        title={"UpdateOwnerShipAccept"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"ACCEPT"} active={active} onClick={onClickUpdateOwnerShipAccept} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default UpdateOwnerShipAccept;