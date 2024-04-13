import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { ISend } from "interfaces/cw20";

export const getSendFee = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, amount, message }: ISend) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationSend(wallet, contractAddress, targetContractAddress, amount, message);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Send = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, amount, message }: ISend) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationSend(wallet, contractAddress, targetContractAddress, amount, message);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.send(wallet, contractAddress, targetContractAddress, amount, message, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}