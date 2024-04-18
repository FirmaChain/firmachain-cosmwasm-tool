import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { ITransfer } from "interfaces/cw721";

export const getTransferFee = async ({ firmaSDK, wallet, contractAddress, recipient, token_id }: ITransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationTransfer(wallet, contractAddress, recipient, token_id);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Transfer = async ({ firmaSDK, wallet, contractAddress, recipient, token_id }: ITransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationTransfer(wallet, contractAddress, recipient, token_id);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.transfer(wallet, contractAddress, recipient, token_id, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}