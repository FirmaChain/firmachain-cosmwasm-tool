import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IUpdateOwnerShipTransfer } from "interfaces/cw721";

export const getUpdateOwnerShipTransferFee = async ({ firmaSDK, wallet, contractAddress, newOwner, expires }: IUpdateOwnerShipTransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipTransfer(wallet, contractAddress, newOwner, expires);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const UpdateOwnerShipTransfer = async ({ firmaSDK, wallet, contractAddress, newOwner, expires }: IUpdateOwnerShipTransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationUpdateOwnerShipTransfer(wallet, contractAddress, newOwner, expires);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.updateOwnerShipTransfer(wallet, contractAddress, newOwner, expires, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}