import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { REVOKE_ALL_LOADING, REVOKE_ALL_SUCCESS } from "constants/message";
import { useRevokeAll } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { getRevokeAllFee } from "../tx/revokeAll";
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

const RevokeAll = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [operator, setOperator] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useRevokeAll(firmaSDK, wallet, contractAddress, operator, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: REVOKE_ALL_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: REVOKE_ALL_SUCCESS, variant: "success" });
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
    LoadingProgress({ enable: isLoading, message: isLoading ? REVOKE_ALL_SUCCESS : undefined });
  }, [isLoading]);

  const checkOperator = useMemo(() => {
    return operator === "" ? true : FirmaUtil.isValidAddress(operator);
  }, [operator]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || operator === "" || checkOperator === false);
    return isActive;
  }, [contractAddress, operator, checkOperator]);

  const onChangeOperator = (value: string) => {
    setOperator(value);
  };

  const onClickRevokeAll = async () => {    
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getRevokeAllFee({ firmaSDK, wallet, contractAddress, operator });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"RevokeAll"} />
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
        title={"RevokeAll"}
        merge={true}
        rowSpan={1}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={operator} placeholder={"ADDR"} checkValue={checkOperator} onChange={onChangeOperator} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"REVOKEALL"} active={active} onClick={onClickRevokeAll} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default RevokeAll;