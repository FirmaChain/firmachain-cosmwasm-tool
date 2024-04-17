import { AccessConfig, Cw721ContractInfo, Cw721Expires, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";

export interface IStoreCode {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  bufferArray: Uint8Array | null;
  accessConfig: AccessConfig;
};

export interface IInstantiateContract {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  admin: string;
  codeId: string;
  label: string;
  message: string;
  funds: Coin[];
};

export interface ICw721ContractInfo {
  contractInfo: Cw721ContractInfo;
  minter: string;
  ownership: IOwnershipResponse;
  ownerNfts: string[];
  totalSupply: number;
};

export interface IOwnershipResponse {
  owner: string | null;
  pending_owner: string | null;
  pending_expiry: Cw721Expires | null;
};

export interface IGetCw721ContractInfo {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  ownerAddress: string;
};

export interface IGetCw721TokenInfo {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
};