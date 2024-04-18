import { AccessConfig, Cw721Approval, Cw721ContractInfo, Cw721Expires, Cw721NftInfo, Expires, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
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

export interface IMint {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  owner: string;
  token_id: string;
  token_uri: string;
};

export interface IBurn {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  token_id: string;
};

export interface ITransfer {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  recipient: string;
  token_id: string;
};

export interface IApprove {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  spender: string;
  token_id: string;
  expires?: Expires;
};

export interface IRevoke {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  spender: string;
  token_id: string;
};

export interface IApproveAll {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  operator: string;
  expires?: Expires;
};

export interface IRevokeAll {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  operator: string;
};

export interface IUpdateOwnerShipTransfer {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  newOwner: string;
  expires?: Expires;
};

export interface IUpdateOwnerShipAccept {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
};

export interface IUpdateOwnerShipRenounce {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
};

export interface ISendNft {
  firmaSDK: FirmaSDK | null;
  wallet: FirmaWalletService | null;
  contractAddress: string;
  targetContractAddress: string;
  token_id: string;
  msg: any;
};

export interface ICw721ContractInfo {
  contractInfo: Cw721ContractInfo;
  minter: string;
  ownership: IOwnershipResponse;
  ownerNfts: string[];
  totalSupply: number;
};

export interface ICw721NftInfo {
  owner: string;
  tokenUri: string;
  approvals: Cw721Approval[];
  nftData: Cw721NftInfo;
}

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

export interface IGetAllNftIdList {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetAllOperators {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  owner: string;
  isIncludeExpired: boolean;
};

export interface IGetOwnerFromNftID {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
};

export interface IGetApproval {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
  spender: string;
  isIncludeExpired: boolean;
};

export interface IGetApprovals {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
  isIncludeExpired: boolean;
};

export interface IGetContractInfo {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetNFTIdListOfOwner {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  owner: string;
};

export interface IGetMinter {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetExtension {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetOwnerShip {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetTotalNfts {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
};

export interface IGetNftTokenUri {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
};

export interface IGetNftData {
  firmaSDK: FirmaSDK | null;
  contractAddress: string;
  tokenId: string;
};