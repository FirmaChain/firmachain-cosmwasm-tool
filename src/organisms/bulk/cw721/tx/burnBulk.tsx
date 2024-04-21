import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IBurnBulk } from "interfaces/cw721";

export const getBurnBulkFee = async ({ firmaSDK, wallet, contractAddress, token_ids }: IBurnBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const token_id of token_ids) {
      const txData = await firmaSDK.Cw721.getUnsignedTxBurn(wallet,contractAddress, token_id);
      txList.push(txData);
    }

    const gas = await firmaSDK.Cw721.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const BurnBulk = async ({ firmaSDK, wallet, contractAddress, token_ids }: IBurnBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const token_id of token_ids) {
      const txData = await firmaSDK.Cw721.getUnsignedTxBurn(wallet,contractAddress, token_id);
      txList.push(txData);
    }

    const gas = await firmaSDK.Cw721.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    const txResult = await firmaSDK.Cw721.signAndBroadcast(wallet, txList, { gas: gas, fee: fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}