import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IRevokeAll } from "interfaces/cw721";

export const getRevokeAllFee = async ({ firmaSDK, wallet, contractAddress, operator }: IRevokeAll) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationRevokeAll(wallet, contractAddress, operator);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const RevokeAll = async ({ firmaSDK, wallet, contractAddress, operator }: IRevokeAll) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationRevokeAll(wallet, contractAddress, operator);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.revokeAll(wallet, contractAddress, operator, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}