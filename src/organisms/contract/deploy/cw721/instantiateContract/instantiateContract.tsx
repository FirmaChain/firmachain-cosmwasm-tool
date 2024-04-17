import { Fragment, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import SmallButton from "components/button/smallButton";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import { useInstantiateContract } from "hooks/cw721/transaction";
import { INSTANTIATE_LOADING, INSTANTIATE_SUCCESS } from "constants/message";
import LoadingProgress from "components/loading/loadingProgress";
import { ContractActions, GlobalActions } from "store/action";
import Toast from "components/toast";
import CodeId from "./codeId";
import Label from "./label";
import Admin from "./admin";
import Minter from "./minter";
import Name from "./name";
import Symbol from "./symbol";

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
}

const InstantiateContract = ({ firmaSDK, wallet }: IProps) => {
  const [codeId, setCodeId] = useState<string>("");
  const [admin, setAdmin] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [funds, setFunds] = useState<Coin[]>([]);
  const [minter, setMinter] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  
  const { mutate } = useInstantiateContract(firmaSDK, wallet, admin, codeId, label, funds, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: INSTANTIATE_LOADING });
    },
    onSuccess: (data: any) => {
      console.log(data);
      ContractActions.handleCw721ContractAddress(data);
      Toast({ message: INSTANTIATE_SUCCESS, variant: "success" });
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      LoadingProgress({ enable: false });
      GlobalActions.handleRefetch("Cw721");
    }
  });

  const checkAdmin = useMemo(() => {
    return admin === "" ? true : FirmaUtil.isValidAddress(admin);
  }, [admin]);

  const checkMinter = useMemo(() => {
    return minter === "" ? true : FirmaUtil.isValidAddress(minter);
  }, [minter]);
  
  const active = useMemo(() => {
    const isActive = Boolean(codeId === "" ||
      admin === "" || label === "" || minter === "" || name === "" || symbol === "" ||
      checkAdmin === false || checkMinter === false);
    return isActive;
  }, [admin, label, minter, name, symbol, checkAdmin]);

  const handleCodeId = (value: string) => { setCodeId(value); }
  const handleAdmin = (value: string) => { setAdmin(value); }
  const handleLabel = (value: string) => { setLabel(value); }
  const handleMinter = (value: string) => { setMinter(value); }
  const handleName = (value: string) => { setName(value); }
  const handleSymbol = (value: string) => { setSymbol(value); }

  const onClickInstantiateContract = () => {
    const message = JSON.stringify({
      minter: minter,
      name: name,
      symbol: symbol
    });

    mutate(message);
  };

  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"InstantiateContract"}
      </Typography>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CodeId codeId={codeId} handleCodeId={handleCodeId} />
            <Label label={label} handleLabel={handleLabel} />
            <Admin adminAddres={admin} checkAddress={checkAdmin} handleAdminAddress={handleAdmin} />
            <Minter minterAddress={minter} checkAddress={checkMinter} handleMinterAddress={handleMinter} />
            <Name name={name} handleName={handleName} />
            <Symbol symbol={symbol} handleSymbol={handleSymbol} />
          </Fragment>
        }
      />
      <Stack alignItems={"flex-end"}>
        <SmallButton title={"Instantiate"} active={active} onClick={onClickInstantiateContract} />
      </Stack>
    </Stack>
  )
}

export default InstantiateContract;