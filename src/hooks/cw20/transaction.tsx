import { UseMutationOptions, useMutation } from "react-query";
import { AccessConfig, Expires, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import { cw20API } from "api";

const DEFAULT_MUTATION_OPTION: UseMutationOptions<any, Error, any, any> = {};

export const useStoreCode = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  bufferArray: Uint8Array | null,
  accessConfig: AccessConfig,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.storeCode>>, Error>
) => {
  return useMutation(() => cw20API.storeCode({ firmaSDK, wallet, bufferArray, accessConfig }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useInstantiateContract = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  admin: string,
  codeId: string,
  label: string,
  funds: Coin[],
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.instantiateContract>>, Error, string>
) => {
  return useMutation<string, Error, string>((message: string) =>
    cw20API.instantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};