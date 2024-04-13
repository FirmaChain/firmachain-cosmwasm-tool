import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IMint } from "interfaces/cw20";

export const getMintFee = async ({ firmaSDK, wallet, contractAddress, recipient, amount }: IMint) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationMint(wallet, contractAddress, recipient, amount);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const Mint = async ({ firmaSDK, wallet, contractAddress, recipient, amount }: IMint) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationMint(wallet, contractAddress, recipient, amount);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.mint(wallet, contractAddress, recipient, amount, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};