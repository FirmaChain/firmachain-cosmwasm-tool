import { UseMutationOptions, useMutation } from "react-query";
import { AccessConfig, Expires, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import { cw721API } from "api";

const DEFAULT_MUTATION_OPTION: UseMutationOptions<any, Error, any, any> = {};

export const useStoreCode = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  bufferArray: Uint8Array | null,
  accessConfig: AccessConfig,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.storeCode>>, Error>
) => {
  return useMutation(() => cw721API.storeCode({ firmaSDK, wallet, bufferArray, accessConfig }), {
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
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.instantiateContract>>, Error, string>
) => {
  return useMutation((message: string) => cw721API.instantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useMint = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  owner: string,
  token_id: string,
  token_uri: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.mint>>, Error>
) => {
  return useMutation(() => cw721API.mint({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useBurn = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  token_id: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.burn>>, Error>
) => {
  return useMutation(() => cw721API.burn({ firmaSDK, wallet, contractAddress, token_id }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useTransfer = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  recipient: string,
  token_id: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.transfer>>, Error>
) => {
  return useMutation(() => cw721API.transfer({ firmaSDK, wallet, contractAddress, recipient, token_id }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useApprove = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  spender: string,
  token_id: string,
  expires?: Expires,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.approve>>, Error>
) => {
  return useMutation(() => cw721API.approve({ firmaSDK, wallet, contractAddress, spender, token_id, expires }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useRevoke = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  spender: string,
  token_id: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.revoke>>, Error>
) => {
  return useMutation(() => cw721API.revoke({ firmaSDK, wallet, contractAddress, spender, token_id }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useApproveAll = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  operator: string,
  expires?: Expires,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.approveAll>>, Error>
) => {
  return useMutation(() => cw721API.approveAll({ firmaSDK, wallet, contractAddress, operator, expires }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useRevokeAll = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  operator: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.revokeAll>>, Error>
) => {
  return useMutation(() => cw721API.revokeAll({ firmaSDK, wallet, contractAddress, operator }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateOwnerShipTransfer = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  newOwner: string,
  expires?: Expires,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.updateOwnerShipTransfer>>, Error>
) => {
  return useMutation(() => cw721API.updateOwnerShipTransfer({ firmaSDK, wallet, contractAddress, newOwner, expires }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateOwnerShipAccept = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.updateOwnerShipAccept>>, Error>
) => {
  return useMutation(() => cw721API.updateOwnerShipAccept({ firmaSDK, wallet, contractAddress }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateOwnerShipRenounce = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.updateOwnerShipRenounce>>, Error>
) => {
  return useMutation(() => cw721API.updateOwnerShipRenounce({ firmaSDK, wallet, contractAddress }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useSendNft = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  targetContractAddress: string,
  token_id: string,
  msg: any,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw721API.sendNft>>, Error>
) => {
  return useMutation(() => cw721API.sendNft({ firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};