import { Expires } from "@firmachain/firma-js/dist/sdk/FirmaCosmWasmCw20";

import { IIncreaseAllowance } from "interfaces/cw20";
import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";

export const getIncreaseAllowance = async ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IIncreaseAllowance) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const newExpires: Expires = (expires === undefined || expires === null) ? { never: {} } : expires;

    const gas = await firmaSDK.Cw20.getGasEstimationIncreaseAllowance(wallet, contractAddress, spender, amount, newExpires);
    const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const IncreaseAllowance = async ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IIncreaseAllowance) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const newExpires: Expires = (expires === undefined || expires === null) ? { never: {} } : expires;

    console.log(newExpires);
    const gas = await firmaSDK.Cw20.getGasEstimationIncreaseAllowance(wallet, contractAddress, spender, amount, newExpires);
    const fee = Math.ceil(gas * 0.1);

    const txResult = await firmaSDK.Cw20.increaseAllowance(wallet, contractAddress, spender, amount, newExpires, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};