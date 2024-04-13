import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IBurn } from "interfaces/cw20";

export const getBurnFee = async ({ firmaSDK, wallet, contractAddress, amount }: IBurn) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const gas = await firmaSDK.Cw20.getGasEstimationBurn(wallet, contractAddress, amount);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const Burn = async ({ firmaSDK, wallet, contractAddress, amount }: IBurn) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

		const gas = await firmaSDK.Cw20.getGasEstimationBurn(wallet, contractAddress, amount);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.burn(wallet, contractAddress, amount, { gas, fee })
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}