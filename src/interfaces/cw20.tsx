import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
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