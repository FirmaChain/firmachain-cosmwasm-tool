import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IBurnFrom } from "interfaces/cw20";

export const getBurnFromFee = async ({ firmaSDK, wallet, contractAddress, owner, amount }: IBurnFrom) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

		const gas = await firmaSDK.Cw20.getGasEstimationBurnFrom(wallet, contractAddress, owner, amount);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const BurnFrom = async ({ firmaSDK, wallet, contractAddress, owner, amount }: IBurnFrom) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

		const gas = await firmaSDK.Cw20.getGasEstimationBurnFrom(wallet, contractAddress, owner, amount);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.burnFrom(wallet, contractAddress, owner, amount, { gas, fee })
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};