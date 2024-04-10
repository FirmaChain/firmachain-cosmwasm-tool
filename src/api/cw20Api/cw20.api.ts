import { IInstantiateContract, IStoreCode } from "interfaces/cw20";
import { InstantiateContract } from "organisms/feature/cw20/tx/instantiateContract";
import { StoreCode } from "organisms/feature/cw20/tx/storeCode";

export const storeCode = ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  return StoreCode({ firmaSDK, wallet, bufferArray, accessConfig });
};

export const instantiateContract = ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  return InstantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds });
};