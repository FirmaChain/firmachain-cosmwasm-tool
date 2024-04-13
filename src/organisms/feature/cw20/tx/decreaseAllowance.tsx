import { Expires } from "@firmachain/firma-js/dist/sdk/FirmaCosmWasmCw20";
import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IDecreaseAllowance } from "interfaces/cw20";

export const getDecreaseAllowanceFee = async ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IDecreaseAllowance) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const newExpires: Expires = (expires === undefined || expires === null) ? { never: {} } : expires;

    console.log(newExpires);
		const gas = await firmaSDK.Cw20.getGasEstimationDecreaseAllowance(wallet, contractAddress, spender, amount, newExpires);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const DecreaseAllowance = async ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IDecreaseAllowance) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const newExpires: Expires = (expires === undefined || expires === null) ? { never: {} } : expires;

    console.log(newExpires);
		const gas = await firmaSDK.Cw20.getGasEstimationDecreaseAllowance(wallet, contractAddress, spender, amount, newExpires);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.decreaseAllowance(wallet, contractAddress, spender, amount, newExpires, { gas, fee })
		console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}