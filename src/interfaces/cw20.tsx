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

export interface IGetCw20ContractInfo {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  ownerAddress: string;
};

export interface ICw20ContractInfo {
  tokenInfo: ICw20TokenInfo;
  minter: IMinter;
  balance: string;
  marketingInfo: IMarketing;
  allAllowances: IAllowance[];
};

export interface ICw20TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: string;
};

interface IMinter {
  minter: string;
  cap: string;
};

interface IMarketing {
  project: string;
  description: string;
  logo: IMarketingLogo;
  marketing: string;
};

interface IMarketingLogo {
  url: string;
};

export interface IAllowance {
  allowance: string;
  expires: Expires;
  spender: string;
};

export interface IGetCw20AddressInfo {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  address: string;
};

export interface IGetBalance {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  address: string;
};

export interface IGetTotalSupply {
  firmaSDK: FirmaSDK;
  contractAddress: string;
};

export interface IGetMinter {
  firmaSDK: FirmaSDK;
  contractAddress: string;
};

export interface IGetAllowance {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  owner: string;
  spender: string;
};

export interface IGetAllAllowances {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  owner: string;
};

export interface IGetAllSpenderAllowances {
  firmaSDK: FirmaSDK;
  contractAddress: string;
  spender: string;
};

export interface IGetAllAccounts {
  firmaSDK: FirmaSDK;
  contractAddress: string;
};

export interface IGetMarketingInfo {
  firmaSDK: FirmaSDK;
  contractAddress: string;
};

export interface IGetDownloadLogo {
  firmaSDK: FirmaSDK;
  contractAddress: string;
};

export interface ICw20AddressInfo {
  balance: string;
  allAllowances: IAllowance[];
  allSpenderAllowances: IAllowance[];
};