import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FirmaSDK } from "@firmachain/firma-js";

import { rootState } from "store/reducers";
import { useCw20ContractInfo } from "./cw20/query";
import { GlobalActions } from "store/action";
import { ICw20ContractInfo } from "interfaces/cw20";

interface IProps {
  firmaSDK: FirmaSDK;
  ownerAddress: string;
}

export const useCw20 = ({ firmaSDK, ownerAddress }: IProps) => {
  const { Cw20ContractAddress } = useSelector((state: rootState) => state.contract);
  const { refetchData } = useSelector((state: rootState) => state.global);
  const { data, refetch, isRefetching, isLoading, isError } = useCw20ContractInfo({ firmaSDK, contractAddress: Cw20ContractAddress, ownerAddress });

  const [cw20ContractInfo, setCw20ContractInfo] = useState<ICw20ContractInfo | null>(null);

  useEffect(() => {
    if (data === undefined) return;

    setCw20ContractInfo({
      tokenInfo: data.tokenInfo,
      minter: data.minter,
      balance: data.balance,
      marketingInfo: data.marketingInfo,
      allAllowances: data.allAllowances,
    });
  }, [data]);

  useEffect(() => {
    if (firmaSDK !== null && ownerAddress !== "") {
      if (refetchData === null || refetchData === "Cw20") {
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
    cw20ContractInfo,
    refetch,
    isLoading
  }
}