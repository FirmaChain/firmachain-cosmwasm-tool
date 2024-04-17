import { UseMutationOptions, useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { FirmaSDK } from "@firmachain/firma-js";

import { cw721API } from "api";
import { UseQueryOptionsWrapper } from "interfaces/type";
import { QUERY_KEYS } from "constants/queryKeys";

const DEFAULT_MUTATION_OPTION: UseMutationOptions<any, Error, any, any> = {};

export const useCw721ContractInfo = (
  params: { firmaSDK: FirmaSDK; contractAddress: string, ownerAddress: string },
  options?: UseQueryOptionsWrapper<Awaited<ReturnType<typeof cw721API.getCw721ContractInfo>>, AxiosError, ReturnType<typeof QUERY_KEYS.cw721Info.list>>
) => {
  const { firmaSDK, contractAddress, ownerAddress } = params;
  const { data, ...rest } = useQuery(QUERY_KEYS.cw721Info.list(), () => cw721API.getCw721ContractInfo({ firmaSDK, contractAddress, ownerAddress }), options);
  return { ...data, ...rest } as const;
};

export const useCw721NftInfo = (
  firmaSDK: FirmaSDK,
  contractAddress: string,
  tokenId: string,
  options?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.getCw721TokenInfo>>, Error>
) => {
  return useMutation(() => cw721API.getCw721TokenInfo({ firmaSDK, contractAddress, tokenId }), {
    ...DEFAULT_MUTATION_OPTION,
    ...options,
  });
}