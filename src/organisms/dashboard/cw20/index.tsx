import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import { rootState } from "store/reducers";
import { ContractActions } from "store/action";

import { useCw20 } from "hooks/useCw20";
import useFirmaSDK from "hooks/useFirmaSDK";
import Cw20ContractInfo from "./contractInfo/cw20ContractInfo";
import Cw20AddressInfo from "./addressInfo/addressInfo";
import { DISTRIBUTE_CONTRACT } from "constants/message";

const DashboardCw20 = () => {
  const { firmaSDK, address } = useFirmaSDK();
  const { cw20ContractInfo: contractInfo } = useCw20({ firmaSDK, ownerAddress: address });
  const { Cw20ContractAddress } = useSelector((state: rootState) => state.contract);

  const cw20ContractInfo = useMemo(() => {
    if (contractInfo === null) return null;

    ContractActions.handleCw20Decimal(contractInfo.tokenInfo.decimals);
    
    return {
      tokenInfo: {
        name: contractInfo.tokenInfo.name,
        symbol: contractInfo.tokenInfo.symbol,
        decimals: contractInfo.tokenInfo.decimals,
        total_supply: contractInfo.tokenInfo.total_supply,
      },
      minter: {
        minter: !contractInfo.minter ? "" : contractInfo.minter.minter,
        cap: !contractInfo.minter ? "" : contractInfo.minter.cap,
      },
      marketingInfo: {
        marketing: !contractInfo.marketingInfo ? "" : contractInfo.marketingInfo.marketing,
        description: !contractInfo.marketingInfo ? "" : contractInfo.marketingInfo.description,
        project: !contractInfo.marketingInfo ? "" : contractInfo.marketingInfo.project,
        logo: !contractInfo.marketingInfo ? { url: ""} : contractInfo.marketingInfo.logo
      },
      balance: contractInfo.balance,
      allAllowances: contractInfo.allAllowances,
    };
  }, [contractInfo]);

  const isAddressEmpty = !Cw20ContractAddress;

  return (
    <div style={{ position: 'relative' }}>
      {isAddressEmpty && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <span style={{ color: 'white', fontSize: '20px' }}>{DISTRIBUTE_CONTRACT}</span>
        </div>
      )}
      <Stack gap={"20px"}>
        <Stack gap={"20px"}>
          <Cw20ContractInfo cw20ContractInfo={cw20ContractInfo} walletAddress={address} />
          <Cw20AddressInfo />
        </Stack>
      </Stack>
    </div>
  )
}

export default DashboardCw20;