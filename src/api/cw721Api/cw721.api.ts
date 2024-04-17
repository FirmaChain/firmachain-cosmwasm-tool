import { IGetCw721ContractInfo, IGetCw721TokenInfo, IInstantiateContract, IStoreCode } from "interfaces/cw721"
import { InstantiateContract } from "organisms/feature/cw721/tx/instantiateContract";
import { StoreCode } from "organisms/feature/cw721/tx/storeCode";

export const storeCode = ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  return StoreCode({ firmaSDK, wallet, bufferArray, accessConfig });
};

export const instantiateContract = ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  return InstantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds });
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