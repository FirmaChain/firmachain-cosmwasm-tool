import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { ISendNft } from "interfaces/cw721";

export const getSendNftFee = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg }: ISendNft) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationSendNft(wallet, contractAddress, targetContractAddress, token_id, msg);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const SendNft = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, token_id, msg }: ISendNft) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationSendNft(wallet, contractAddress, targetContractAddress, token_id, msg);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.sendNft(wallet, contractAddress, targetContractAddress, token_id, msg, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}