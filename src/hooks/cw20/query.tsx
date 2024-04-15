import { UseMutationOptions, useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import { FirmaSDK } from "@firmachain/firma-js";

import { cw20API } from "api";
import { UseQueryOptionsWrapper } from "interfaces/type";
import { QUERY_KEYS } from "constants/queryKeys";

const DEFAULT_MUTATION_OPTION: UseMutationOptions<any, Error, any, any> = {};

export const useCw20ContractInfo = (
  params: { firmaSDK: FirmaSDK; contractAddress: string, ownerAddress: string },
  options?: UseQueryOptionsWrapper<Awaited<ReturnType<typeof cw20API.useCw20ContractInfo>>, AxiosError, ReturnType<typeof QUERY_KEYS.cw20Info.list>>
) => {
  const { firmaSDK, contractAddress, ownerAddress } = params;
  const { data, ...rest } = useQuery(QUERY_KEYS.cw20Info.list(), () => cw20API.useCw20ContractInfo({ firmaSDK, contractAddress, ownerAddress }), options);
  return { ...data, ...rest } as const;
};

export const useCw20AddressInfo = (
  firmaSDK: FirmaSDK,
  contractAddress: string,
  address: string,
  options?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.useCw20AddressInfo>>, Error>
) => {
  return useMutation(() => cw20API.useCw20AddressInfo({ firmaSDK, contractAddress, address }), {
    ...DEFAULT_MUTATION_OPTION,
    ...options,
  });
}