import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IBurn } from "interfaces/cw721";

export const getBurnFee = async ({ firmaSDK, wallet, contractAddress, token_id }: IBurn) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationBurn(wallet, contractAddress, token_id);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Burn = async ({ firmaSDK, wallet, contractAddress, token_id }: IBurn) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationBurn(wallet, contractAddress, token_id);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.burn(wallet, contractAddress, token_id, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}