import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IMintBulk } from "interfaces/cw20";

export const getMintBulkFee = async ({ firmaSDK, wallet, contractAddress, mintBulkTargets }: IMintBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const mintBulkTarget of mintBulkTargets) {
      const txData = await firmaSDK.Cw20.getUnsignedTxMint(wallet,contractAddress, mintBulkTarget.recipient, mintBulkTarget.amount);
      txList.push(txData);
    }

    const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const MintBulk = async ({ firmaSDK, wallet, contractAddress, mintBulkTargets }: IMintBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const mintBulkTarget of mintBulkTargets) {
      const txData = await firmaSDK.Cw20.getUnsignedTxMint(wallet,contractAddress, mintBulkTarget.recipient, mintBulkTarget.amount);
      txList.push(txData);
    }

    const gas = await firmaSDK.Cw20.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    const txResult = await firmaSDK.Cw20.signAndBroadcast(wallet, txList, { gas: gas, fee: fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}