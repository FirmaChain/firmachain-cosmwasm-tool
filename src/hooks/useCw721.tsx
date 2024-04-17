import { FirmaSDK } from "@firmachain/firma-js";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { useCw721ContractInfo } from "./cw721/query";
import { ICw721ContractInfo } from "interfaces/cw721";
import { useEffect, useState } from "react";
import { GlobalActions } from "store/action";

interface IProps {
  firmaSDK: FirmaSDK;
  ownerAddress: string;
}

export const useCw721 = ({ firmaSDK, ownerAddress }: IProps) => {
  const { Cw721ContractAddress } = useSelector((state: rootState) => state.contract);
  const { refetchData } = useSelector((state: rootState) => state.global);
  const { data, refetch, isRefetching, isLoading, isError } = useCw721ContractInfo({ firmaSDK, contractAddress: Cw721ContractAddress, ownerAddress });

  const [cw721ContractInfo, setCw721ContractInfo] = useState<ICw721ContractInfo | null>(null);
  
  useEffect(() => {
    if (data === undefined) return;

    setCw721ContractInfo({
      contractInfo: data.contractInfo,
      minter: data.minter,
      ownership: data.ownership,
      ownerNfts: data.ownerNfts,
      totalSupply: data.totalSupply
    });
  }, [data]);

  useEffect(() => {
    if (firmaSDK !== null && ownerAddress !== "") {
      if (refetchData === null || refetchData === 'Cw721') {
        refetch();
      }
    }
  }, [refetchData, ownerAddress, firmaSDK, isError]);

  useEffect(() => {
    if (isRefetching === false) {
      GlobalActions.handleRefetch(null);
    }
  }, [isRefetching]);

  return {
    cw721ContractInfo,
    refetch,
    isLoading
  }
}