import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IUpdateOwnerShipAccept } from "interfaces/cw721";

export const getUpdateOwnerShipAcceptFee = async ({ firmaSDK, wallet, contractAddress }: IUpdateOwnerShipAccept) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipAccept(wallet, contractAddress);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const UpdateOwnerShipAccept = async ({ firmaSDK, wallet, contractAddress }: IUpdateOwnerShipAccept) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipAccept(wallet, contractAddress);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.updateOwnerShipAccept(wallet, contractAddress, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}