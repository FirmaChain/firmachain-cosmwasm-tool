import { Fragment, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import Toast from "components/toast";
import LoadingProgress from "components/loading/loadingProgress";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import SmallButton from "components/button/smallButton";
import LabelDisplay from "components/text/labelDisplay";
import AmountDisplay from "components/text/amountDisplay";

import Decimal from "./decimal";
import InitialAddress from "./initialAddress";
import TokenName from "./tokenName";
import TokenSymbol from "./tokenSymbol";
import InitialBalance from "./initialBalance";
import Label from "./label";
import MinterAddress from "./minterAddress";
import MinterCap from "./minterCap";
import MarketingDesc from "./marketingDesc";
import MarketingLogo from "./marketingLogo";
import MarketingAddress from "./marketingAddress";
import MarketingProject from "./marketingProject";
import CodeId from "./codeId";
import Admin from "./admin";


import { ContractActions, GlobalActions } from "store/action";
import { adjustValueByDecimal, formatNumberWithComma } from "utils/number";
import { useModal } from "hooks/useTxModal";
import { shortenAddress } from "utils/address";

import { useInstantiateContract } from "hooks/cw20/transaction";
import { getInstantiateContract } from "organisms/feature/cw20/tx/instantiateContract";
import { INSTANTIATE_LOADING, INSTANTIATE_SUCCESS } from "constants/message";

interface IProps {
  firmaSDK: FirmaSDK;
  address: string;
  wallet: FirmaWalletService;
}

const InstantiateContract = ({ firmaSDK, address, wallet }: IProps) => {
  const [codeId, setCodeId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [admin, setAdmin] = useState<string>("");
  const [decimal, setDecimal] = useState<number>(6);
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");
  const [initialBalance, setInitialBalance] = useState<string>("");
  const [initialAddress, setInitialAddress] = useState<string>("");
  const [minterAddress, setMinterAddress] = useState<string>("");
  const [minterCap, setMinterCap] = useState<number>(0);
  const [marketingDesc, setMarketingDesc] = useState<string>("");
  const [marketingLogo, setMarketingLogo] = useState<string>("");
  const [marketingAddress, setMarketingAddress] = useState<string>("");
  const [marketingProject, setMarketingProject] = useState<string>("");
  const [funds, setFunds] = useState<Coin[]>([]);
  
  const { openModal, closeModal } = useModal();
  
  const { mutate } = useInstantiateContract(firmaSDK, wallet, admin, codeId, label, funds, {
    onMutate: () => {
      LoadingProgress({ enable: true, message: INSTANTIATE_LOADING });
    },
    onSuccess: (data: any) => {
      Toast({ message: INSTANTIATE_SUCCESS, variant: "success" });
      ContractActions.handleCw20ContractAddress(data);
      ContractActions.handleCw20Decimal(decimal);
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

  const checkAdmin = useMemo(() => {
    return admin === "" ? true : FirmaUtil.isValidAddress(admin);
  }, [admin]);

  const checkMinter = useMemo(() => {
    return minterAddress === "" ? true : FirmaUtil.isValidAddress(minterAddress);
  }, [minterAddress]);

  const checkMarketingAddress = useMemo(() => {
    return marketingAddress === "" ? true : FirmaUtil.isValidAddress(marketingAddress);
  }, [marketingAddress]);

  const active = useMemo(() => {
    const isActive = Boolean(codeId === "" ||
      label === "" || admin === "" || decimal === 0 || tokenName === "" || tokenSymbol === "" ||
      initialBalance === "" || initialAddress === "" ||
      checkAdmin === false || checkMinter === false || checkMarketingAddress === false);
    return isActive;
  }, [codeId, label, admin, decimal, tokenName, tokenSymbol, initialBalance, initialAddress, checkAdmin, checkMinter, minterAddress, minterCap, checkAdmin, checkMinter, checkMarketingAddress]);

  const handleCodeId = (value: string) => { setCodeId(value); }
  const handleLabel = (value: string) => { setLabel(value); }
  const handleAdmin = (value: string) => { setAdmin(value); }
  const handleDecimal = (value: number) => { setDecimal(value); }
  const handleTokenName = (value: string) => { setTokenName(value); }
  const handleTokenSymbol = (value: string) => { setTokenSymbol(value); }
  const handleInitialBalance = (value: string) => { setInitialBalance(value); }
  const handleInitialAddress = (value: string) => { setInitialAddress(value); }
  const handleMinterAddress = (value: string) => { setMinterAddress(value); }
  const handleMinterCap = (value: number) => { setMinterCap(value); }
  const handleMarketingDesc = (value: string) => { setMarketingDesc(value); }
  const handleMarketingLogo = (value: string) => { setMarketingLogo(value); }
  const handleMarketingAddress = (value: string) => { setMarketingAddress(value); }
  const handleMarketingProject = (value: string) => { setMarketingProject(value); }

  const onClickInstantiateContract = async () => {
    try {
      const balance = await firmaSDK.Bank.getBalance(address);
      const initial_balances = initialAddress.split(',').map((address, index) => ({
        address,
        amount: adjustValueByDecimal(initialBalance.split(',')[index], decimal)
      }));
  
      const hasMarketingInfo = marketingDesc !== "" && marketingLogo !== "" && marketingAddress !== "" && marketingProject !== "";
      const hasMinterInfo = minterAddress !== "" && minterCap !== 0;
  
      const messageDataObj = {
        decimals: Number(decimal),
        name: tokenName,
        symbol: tokenSymbol,
        initial_balances: initial_balances,
        ...(hasMinterInfo && {
          mint: {
            minter: minterAddress,
            cap: adjustValueByDecimal(minterCap, decimal)
          }
        }),
        ...(hasMarketingInfo && {
          marketing: {
            description: marketingDesc,
            logo: { url: marketingLogo },
            marketing: marketingAddress,
            project: marketingProject
          }
        })
      };
  
      const message = JSON.stringify(messageDataObj);
      const fee = await getInstantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds });

      openModal(
        <Fragment>
          <Stack gap={"10px"}>
            <LabelDisplay label={"Type (Trx.)"} value={"Instantiate"} />
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
    const initial_balances = initialAddress.split(',').map((address, index) => ({
      address,
      amount: adjustValueByDecimal(initialBalance.split(',')[index], decimal)
    }));

    const hasMarketingInfo = marketingDesc !== "" && marketingLogo !== "" && marketingAddress !== "" && marketingProject !== "";
    const hasMinterInfo = minterAddress !== "" && minterCap !== 0;

    const messageDataObj = {
      decimals: Number(decimal),
      name: tokenName,
      symbol: tokenSymbol,
      initial_balances: initial_balances,
      ...(hasMinterInfo && {
        mint: {
          minter: minterAddress,
          cap: adjustValueByDecimal(minterCap, decimal)
        }
      }),
      ...(hasMarketingInfo && {
        marketing: {
          description: marketingDesc,
          logo: { url: marketingLogo },
          marketing: marketingAddress,
          project: marketingProject
        }
      })
    };
    
    const message = JSON.stringify(messageDataObj);
    mutate(message);
  }

  const onClickCancel = () => {
    console.log("close modal");
    closeModal();
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
            <Admin adminAddress={admin} checkAddress={checkAdmin} handleAdminAddress={handleAdmin} />
            <Decimal decimal={decimal} handleDecimal={handleDecimal} />
            <TokenName tokenName={tokenName} handleTokenName={handleTokenName} />
            <TokenSymbol tokenSymbol={tokenSymbol} handleTokenSymbol={handleTokenSymbol} />
            <InitialBalance initialBalance={initialBalance} handleInitialBalance={handleInitialBalance} />
            <InitialAddress initialAddress={initialAddress} handleInitialAddress={handleInitialAddress} />
            <MinterAddress minterAddress={minterAddress} checkAddress={checkMinter} handleMinterAddress={handleMinterAddress} />
            <MinterCap minterCap={minterCap} handleMinterCap={handleMinterCap} />
            <MarketingDesc marketingDesc={marketingDesc} handleMarketingDesc={handleMarketingDesc} />
            <MarketingLogo marketingLogo={marketingLogo} handleMarketingLogo={handleMarketingLogo} />
            <MarketingAddress marketingAddress={marketingAddress} checkAddress={checkMarketingAddress} handleMarketingAddress={handleMarketingAddress} />
            <MarketingProject marketingProject={marketingProject} handleMarketingProject={handleMarketingProject} />
          </Fragment>
        }
      />
      <Stack alignItems={"flex-end"}>
        <SmallButton title={"Instantiate"} active={active} onClick={onClickInstantiateContract} />
      </Stack>
    </Stack>
  );
}

export default InstantiateContract;