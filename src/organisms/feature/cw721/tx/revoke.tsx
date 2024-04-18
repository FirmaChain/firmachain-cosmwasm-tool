import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IRevoke } from "interfaces/cw721";

export const getRevokeFee = async ({ firmaSDK, wallet, contractAddress, spender, token_id }: IRevoke) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationRevoke(wallet, contractAddress, spender, token_id);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Revoke = async ({ firmaSDK, wallet, contractAddress, spender, token_id }: IRevoke) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationRevoke(wallet, contractAddress, spender, token_id);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.revoke(wallet, contractAddress, spender, token_id, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}