import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IApprove } from "interfaces/cw721";

export const getApproveFee = async ({ firmaSDK, wallet, contractAddress, spender, token_id, expires }: IApprove) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationApprove(wallet, contractAddress, spender, token_id, expires);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Approve = async ({ firmaSDK, wallet, contractAddress, spender, token_id, expires }: IApprove) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    console.log(spender);
    console.log(token_id);
    console.log(expires);
    
    const gas = await firmaSDK.Cw721.getGasEstimationApprove(wallet, contractAddress, spender, token_id, expires);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.approve(wallet, contractAddress, spender, token_id, expires, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}