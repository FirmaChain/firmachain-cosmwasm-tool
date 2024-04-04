import { Fragment, useMemo, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { FirmaSDK, FirmaUtil, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import Decimal from "./decimal";
import TableWithNoHeader from "components/table/tableWithNoHeader";
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
import SmallButton from "components/button/smallButton";
import CodeId from "./codeId";
import Admin from "./admin";
import { shortenAddress } from "utils/address";
import { adjustValueByDecimal } from "utils/number";

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
  }

  const onClickCancel = () => {
    console.log("close modal");
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
        <SmallButton title={"Instantiate"} active={active} onClick={onClickConfirm} />
      </Stack>
    </Stack>
  );
}

export default InstantiateContract;