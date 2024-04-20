import { UseMutationOptions, useMutation } from "react-query";
import { AccessConfig, Expires, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

import { IBurnFromBulkTarget, IMintBulkTarget, ITransferBulkTarget, ITransferFromBulkTarget } from "interfaces/cw20";

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

export const useIncreaseAllowance = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  spender: string,
  amount: string,
  expires?: Expires,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.increaseAllowance>>, Error>
) => {
  return useMutation(() => cw20API.increaseAllowance({ firmaSDK, wallet, contractAddress, spender, amount, expires }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useDecreaseAllowance = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  spender: string,
  amount: string,
  expires?: Expires,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.decreaseAllowance>>, Error>
) => {
  return useMutation(() => cw20API.decreaseAllowance({ firmaSDK, wallet, contractAddress, spender, amount, expires }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useSend = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  targetContractAddress: string,
  amount: string,
  message: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.send>>, Error>
) => {
  return useMutation(() => cw20API.send({ firmaSDK, wallet, contractAddress, targetContractAddress, amount, message }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useSendFrom = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  targetContractAddress: string,
  owner: string,
  amount: string,
  message: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.sendFrom>>, Error>
) => {
  return useMutation(() => cw20API.sendFrom({ firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount, message }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useTransfer = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  recipient: string,
  amount: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.transfer>>, Error>
) => {
  return useMutation(() => cw20API.transfer({ firmaSDK, wallet, contractAddress, recipient, amount }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useTransferFrom = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  owner: string,
  recipient: string,
  amount: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.transferFrom>>, Error>
) => {
  return useMutation(() => cw20API.transferFrom({ firmaSDK, wallet, contractAddress, owner, recipient, amount }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useBurn = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  amount: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.burn>>, Error>
) => {
  return useMutation(() => cw20API.burn({ firmaSDK, wallet, contractAddress, amount }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useBurnFrom = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  owner: string,
  amount: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.burnFrom>>, Error>
) => {
  return useMutation(() => cw20API.burnFrom({ firmaSDK, wallet, contractAddress, owner, amount }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useMint = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  recipient: string,
  amount: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.mint>>, Error>
) => {
  return useMutation(() => cw20API.mint({ firmaSDK, wallet, contractAddress, recipient, amount }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateMinter = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  new_minter: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.updateMinter>>, Error>
) => {
  return useMutation(() => cw20API.updateMinter({ firmaSDK, wallet, contractAddress, new_minter }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateMarketing = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  description: string,
  marketing: string,
  project: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.updateMarketing>>, Error>
) => {
  return useMutation(() => cw20API.updateMarketing({ firmaSDK, wallet, contractAddress, description, marketing, project }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useUpdateLogo = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  url: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.updateLogo>>, Error>
) => {
  return useMutation(() => cw20API.updateLogo({ firmaSDK, wallet, contractAddress, url }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

// BULK TX
export const useTransferBulk = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.transferBulk>>, Error, ITransferBulkTarget[]>
) => {
  return useMutation((transferBulkTargets) => cw20API.transferBulk({ firmaSDK, wallet, contractAddress, transferBulkTargets }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useTransferFromBulk = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.transferFromBulk>>, Error, ITransferFromBulkTarget[]>
) => {
  return useMutation((transferFromBulkTargets) => cw20API.transferFromBulk({ firmaSDK, wallet, contractAddress, transferFromBulkTargets }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useBurnBulk = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.burnBulk>>, Error, string[]>
) => {
  return useMutation((amountArray) => cw20API.burnBulk({ firmaSDK, wallet, contractAddress, amountArray }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useBurnFromBulk = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.burnFromBulk>>, Error, IBurnFromBulkTarget[]>
) => {
  return useMutation((burnFromBulkTargets) => cw20API.burnFromBulk({ firmaSDK, wallet, contractAddress, burnFromBulkTargets }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};

export const useMintBulk = (
  firmaSDK: FirmaSDK | null,
  wallet: FirmaWalletService | null,
  contractAddress: string,
  option?: UseMutationOptions<Awaited<ReturnType<typeof cw20API.mintBulk>>, Error, IMintBulkTarget[]>
) => {
  return useMutation((mintBulkTargets) => cw20API.mintBulk({ firmaSDK, wallet, contractAddress, mintBulkTargets }), {
    ...DEFAULT_MUTATION_OPTION,
    ...option
  });
};