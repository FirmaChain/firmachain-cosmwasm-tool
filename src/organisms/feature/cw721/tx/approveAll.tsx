import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IApproveAll } from "interfaces/cw721";

export const getApproveAllFee = async ({ firmaSDK, wallet, contractAddress, operator, expires }: IApproveAll) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationApproveAll(wallet, contractAddress, operator, expires);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const ApproveAll = async ({ firmaSDK, wallet, contractAddress, operator, expires }: IApproveAll) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationApproveAll(wallet, contractAddress, operator, expires);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.approveAll(wallet, contractAddress, operator, expires, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}