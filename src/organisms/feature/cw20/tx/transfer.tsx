import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { ITransfer } from "interfaces/cw20";

export const getTransferFee = async ({ firmaSDK, wallet, contractAddress, recipient, amount }: ITransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

		const gas = await firmaSDK.Cw20.getGasEstimationTransfer(wallet, contractAddress, recipient, amount);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Transfer = async ({ firmaSDK, wallet, contractAddress, recipient, amount }: ITransfer) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

		const gas = await firmaSDK.Cw20.getGasEstimationTransfer(wallet, contractAddress, recipient, amount);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.transfer(wallet, contractAddress, recipient, amount, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}