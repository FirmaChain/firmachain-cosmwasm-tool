import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { ISendFrom } from "interfaces/cw20";

export const getSendFromFee = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount, message }: ISendFrom) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationSendFrom(wallet, contractAddress, targetContractAddress, owner, amount, message);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const SendFrom = async ({ firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount, message }: ISendFrom) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationSendFrom(wallet, contractAddress, targetContractAddress, owner, amount, message);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.sendFrom(wallet, contractAddress, targetContractAddress, owner, amount, message, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}