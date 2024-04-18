import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IMint } from "interfaces/cw721";

export const getMintFee = async ({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri }: IMint) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationMint(wallet, contractAddress, owner, token_id, token_uri);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const Mint = async ({ firmaSDK, wallet, contractAddress, owner, token_id, token_uri }: IMint) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw721.getGasEstimationMint(wallet, contractAddress, owner, token_id, token_uri);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw721.mint(wallet, contractAddress, owner, token_id, token_uri, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}