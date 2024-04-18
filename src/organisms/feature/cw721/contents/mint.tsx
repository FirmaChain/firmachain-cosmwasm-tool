import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";

import LoadingProgress from "components/loading/loadingProgress";
import Toast from "components/toast";
import { MINT_LOADING, MINT_SUCCESS } from "constants/message";
import { useMint } from "hooks/cw721/transaction";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import { GlobalActions } from "store/action";
import { useModal } from "hooks/useTxModal";
import { getMintFee } from "../tx/mint";
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

const Mint = ({ firmaSDK, wallet, address, contractAddress }: IProps) => {
  const [owner, setOwner] = useState<string>("");
  const [token_id, setToken_id] = useState<string>("");
  const [token_uri, setToken_uri] = useState<string>("");

  const { openModal, closeModal } = useModal();

  const { mutate, isLoading } = useMint(firmaSDK, wallet, contractAddress, owner, token_id, token_uri, {
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
      closeModal();
    }
  });

  useEffect(() => {
    LoadingProgress({ enable: isLoading, message: isLoading ? MINT_SUCCESS : undefined });
  }, [isLoading]);

  const checkOwner = useMemo(() => {
    return owner === "" ? true : FirmaUtil.isValidAddress(owner);
  }, [owner]);

  const active = useMemo(() => {
    const isActive = Boolean(contractAddress === "" || owner === "" || token_id === "" || token_uri === "" || checkOwner === false);
    return isActive;
  }, [contractAddress, owner, token_id, token_uri, checkOwner]);

  const onChangeOwner = (value: string) => {
    setOwner(value);
  };

  const onChangeTokenId = (value: string) => {
    setToken_id(value);
  };

  const onChangeTokenUri = (value: string) => {
    setToken_uri(value);
  };

  const onClickMint = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const fee = await getMintFee({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Mint"} />
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
        title={"Mint"}
        merge={true}
        rowSpan={3}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={owner} placeholder={"ADDRESS"} checkValue={checkOwner} onChange={onChangeOwner} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Mint"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_id} type={"number"} placeholder={"TOKEN ID"} onChange={onChangeTokenId} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }} />
          </Stack>
        }
      />
      <CustomRow
        title={"Mint"}
        merge={true}
        rowSpan={0}
        children={
          <Stack flexDirection={"row"} gap={"10px"}>
            <TextInput value={token_uri} placeholder={"ex) https://firmachain.org/uri/1"} onChange={onChangeTokenUri} />
            <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
              <SmallButton title={"MINT"} active={active} onClick={onClickMint} />
            </Stack>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default Mint;