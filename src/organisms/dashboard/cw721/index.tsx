import { useMemo } from "react";
import { Stack } from "@mui/material";

import useFirmaSDK from "hooks/useFirmaSDK";
import ContractInfo from "./contractInfo/cw721ContractInfo";
import Cw721NftInfo from "./nftInfo/nftInfo";
import { useCw721 } from "hooks/useCw721";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { DISTRIBUTE_CONTRACT } from "constants/message";

const DashboardCw721 = () => {
  const { firmaSDK, address } = useFirmaSDK();
  const { cw721ContractInfo: cw721Data } = useCw721({ firmaSDK, ownerAddress: address });
  const { Cw721ContractAddress } = useSelector((state: rootState) => state.contract);

  const cw721ContractInfo = useMemo(() => {
    if (cw721Data === null) return null;

    return {
      contractInfo: cw721Data.contractInfo,
      minter: cw721Data.minter,
      ownership: cw721Data.ownership,
      ownerNfts: cw721Data.ownerNfts,
      totalSupply: cw721Data.totalSupply
    }
  }, [cw721Data]);

  const isAddressEmpty = !Cw721ContractAddress;

  return (
    <div style={{ position: 'relative' }}>
      {isAddressEmpty && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <span style={{ color: 'white', fontSize: '20px' }}>{DISTRIBUTE_CONTRACT}</span>
        </div>
      )}
      <Stack gap={"20px"}>
        <Stack gap={"20px"}>
          <ContractInfo cw721ContractInfo={cw721ContractInfo} walletAddress={address} />
          <Cw721NftInfo walletAddress={address} />
        </Stack>
      </Stack>
    </div>
  )
}

export default DashboardCw721;