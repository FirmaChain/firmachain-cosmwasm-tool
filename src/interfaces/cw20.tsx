import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Expires } from "@firmachain/firma-js/dist/sdk/FirmaCosmWasmCw20";
import { AccessConfig } from "cosmjs-types/cosmwasm/wasm/v1/types";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

export interface IStoreCode {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  bufferArray: Uint8Array | null;
  accessConfig: AccessConfig
};

export interface IInstantiateContract {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  admin: string;
  codeId: string;
  label: string;
  message: string;
  funds: Coin[]
};

export interface IIncreaseAllowance {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  spender: string; 
  amount: string;
  expires?: Expires
};

export interface IDecreaseAllowance {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  spender: string; 
  amount: string;
  expires?: Expires;
};

export interface ISend {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  targetContractAddress: string;
  amount: string;
  message: any;
};

export interface ISendFrom {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  targetContractAddress: string;
  owner: string;
  amount: string;
  message: any;
};

export interface ITransfer {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  recipient: string;
  amount: string;
};

export interface ITransferFrom {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  owner: string;
  recipient: string;
  amount: string;
};

export interface IBurn {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  amount: string;
};

export interface IBurnFrom {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  owner: string;
  amount: string;
};

export interface IMint {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  recipient: string;
  amount: string;
};

export interface IUpdateMinter {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  new_minter: string;
};

export interface IUpdateMarketing {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  description: string;
  marketing: string;
  project: string;
};

export interface IUpdateLogo {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
  contractAddress: string;
  url: string;
};