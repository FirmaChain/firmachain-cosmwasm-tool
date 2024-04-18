import { IApprove, IApproveAll, IBurn, IGetAllNftIdList, IGetAllOperators, IGetApproval, IGetApprovals, IGetCw721ContractInfo, IGetCw721TokenInfo, IGetContractInfo, IGetExtension, IGetMinter, IGetNFTIdListOfOwner, IGetNftData, IGetNftTokenUri, IGetOwnerFromNftID, IGetOwnerShip, IGetTotalNfts, IInstantiateContract, IMint, IRevoke, IRevokeAll, ISendNft, IStoreCode, ITransfer, IUpdateOwnerShipAccept, IUpdateOwnerShipRenounce, IUpdateOwnerShipTransfer } from "interfaces/cw721"
import { InstantiateContract } from "organisms/feature/cw721/tx/instantiateContract";
import { Approve } from "organisms/feature/cw721/tx/approve";
import { ApproveAll } from "organisms/feature/cw721/tx/approveAll";
import { Burn } from "organisms/feature/cw721/tx/burn";
import { Mint } from "organisms/feature/cw721/tx/mint";
import { Revoke } from "organisms/feature/cw721/tx/revoke";
import { RevokeAll } from "organisms/feature/cw721/tx/revokeAll";
import { SendNft } from "organisms/feature/cw721/tx/sendNft";
import { StoreCode } from "organisms/feature/cw721/tx/storeCode";
import { Transfer } from "organisms/feature/cw721/tx/transfer";
import { UpdateOwnerShipAccept } from "organisms/feature/cw721/tx/updateOwnerShipAccept";
import { UpdateOwnerShipRenounce } from "organisms/feature/cw721/tx/updateOwnerShipRenounce";
import { UpdateOwnerShipTransfer } from "organisms/feature/cw721/tx/updateOwnerShipTransfer";

export const storeCode = ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  return StoreCode({ firmaSDK, wallet, bufferArray, accessConfig });
};

export const instantiateContract = ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  return InstantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds });
};

export const mint = ({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri }: IMint) => {
  return Mint({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri });
};

export const burn = ({ firmaSDK, wallet, contractAddress, token_id }: IBurn) => {
  return Burn({ firmaSDK, wallet, contractAddress, token_id });
};

export const transfer = ({ firmaSDK, wallet, contractAddress, recipient, token_id }: ITransfer) => {
  return Transfer({ firmaSDK, wallet, contractAddress, recipient, token_id });
};

export const approve = ({ firmaSDK, wallet, contractAddress, spender, token_id, expires }: IApprove) => {
  return Approve({ firmaSDK, wallet, contractAddress, spender, token_id, expires });
};

export const revoke = ({ firmaSDK, wallet, contractAddress, spender, token_id }: IRevoke) => {
  return Revoke({ firmaSDK, wallet, contractAddress, spender, token_id });
};

export const approveAll = ({ firmaSDK, wallet, contractAddress, operator, expires }: IApproveAll) => {
  return ApproveAll({ firmaSDK, wallet, contractAddress, operator, expires });
};

export const revokeAll = ({ firmaSDK, wallet, contractAddress, operator }: IRevokeAll) => {
  return RevokeAll({ firmaSDK, wallet, contractAddress, operator });
};

export const updateOwnerShipTransfer = ({ firmaSDK, wallet, contractAddress, newOwner, expires }: IUpdateOwnerShipTransfer) => {
  return UpdateOwnerShipTransfer({ firmaSDK, wallet, contractAddress, newOwner, expires });
};

export const updateOwnerShipAccept = ({ firmaSDK, wallet, contractAddress }: IUpdateOwnerShipAccept) => {
  return UpdateOwnerShipAccept({ firmaSDK, wallet, contractAddress });
};

export const updateOwnerShipRenounce = ({ firmaSDK, wallet, contractAddress }: IUpdateOwnerShipRenounce) => {
  return UpdateOwnerShipRenounce({ firmaSDK, wallet, contractAddress });
};

export const sendNft = ({ firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg }: ISendNft) => {
  return SendNft({ firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg });
};

export const getCw721ContractInfo = ({ firmaSDK, contractAddress, ownerAddress }: IGetCw721ContractInfo) => {
  const executeQuery = async () => {
    try {
      if (firmaSDK === null || contractAddress === "" || ownerAddress === "") return;

      const contractInfo = await firmaSDK.Cw721.getContractInfo(contractAddress);
      const minter = await firmaSDK.Cw721.getMinter(contractAddress);
      const ownership = await firmaSDK.Cw721.getOwnerShip(contractAddress);
      const ownerNfts = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress, ownerAddress);
      const totalSupply = await firmaSDK.Cw721.getTotalNfts(contractAddress);

      return {
        data: {
          contractInfo, minter, ownership, ownerNfts, totalSupply
        }
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getCw721TokenInfo = ({ firmaSDK, contractAddress, tokenId }: IGetCw721TokenInfo) => {
  const executeQuery = async () => {
    try {
      console.log(tokenId);
      if (firmaSDK === null || contractAddress === "" || tokenId === "") return;

      const owner = await firmaSDK.Cw721.getOwnerFromNftID(contractAddress, tokenId);
      const tokenUri = await firmaSDK.Cw721.getNftTokenUri(contractAddress, tokenId);
      const approvals = await firmaSDK.Cw721.getApprovals(contractAddress, tokenId);
      const nftData = await firmaSDK.Cw721.getNftData(contractAddress, tokenId);

      return {
        data: {
          owner, tokenUri, approvals, nftData
        }
      }
      
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getOwnerFromNftID = ({ firmaSDK, contractAddress, tokenId }: IGetOwnerFromNftID) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getOwnerFromNftID(contractAddress, tokenId);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getApproval = ({ firmaSDK, contractAddress, tokenId, spender, isIncludeExpired }: IGetApproval) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getApproval(contractAddress, tokenId, spender, isIncludeExpired);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getApprovals = ({ firmaSDK, contractAddress, tokenId, isIncludeExpired }: IGetApprovals) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getApprovals(contractAddress, tokenId, isIncludeExpired);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getAllOperators = ({ firmaSDK, contractAddress, owner, isIncludeExpired }: IGetAllOperators) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getAllOperators(contractAddress, owner, isIncludeExpired);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getTotalNfts = ({ firmaSDK, contractAddress }: IGetTotalNfts) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getTotalNfts(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getContractInfo = ({ firmaSDK, contractAddress }: IGetContractInfo) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getContractInfo(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getNftTokenUri = ({ firmaSDK, contractAddress, tokenId }: IGetNftTokenUri) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getNftTokenUri(contractAddress, tokenId);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getNftData = ({ firmaSDK, contractAddress, tokenId }: IGetNftData) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getNftData(contractAddress, tokenId);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getNftIdListOfOwner = ({ firmaSDK, contractAddress, owner }: IGetNFTIdListOfOwner) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getNFTIdListOfOwner(contractAddress, owner);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getAllNftIdList = ({ firmaSDK, contractAddress }: IGetAllNftIdList) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getAllNftIdList(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getMinter = ({ firmaSDK, contractAddress }: IGetMinter) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getMinter(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getExtension = ({ firmaSDK, contractAddress }: IGetExtension) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getExtension(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const getOwnerShip = ({ firmaSDK, contractAddress }: IGetOwnerShip) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw721.getOwnerShip(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};