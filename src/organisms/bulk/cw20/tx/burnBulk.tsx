import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IBurnBulk } from "interfaces/cw20";

export const getBurnBulkFee = async ({ firmaSDK, wallet, contractAddress, amountArray }: IBurnBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const amount of amountArray) {
      const txData = await firmaSDK.Cw20.getUnsignedTxBurn(wallet,contractAddress, amount);
      txList.push(txData);
    }

    const gas = await firmaSDK.CwBridge.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const BurnBulk = async ({ firmaSDK, wallet, contractAddress, amountArray }: IBurnBulk) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    let txList = [];
    for (const amount of amountArray) {
      const txData = await firmaSDK.Cw20.getUnsignedTxBurn(wallet,contractAddress, amount);
      txList.push(txData);
    }

    const gas = await firmaSDK.CwBridge.getGasEstimationSignAndBroadcast(wallet, txList);
		const fee = Math.ceil(gas * 0.1);

    const txResult = await firmaSDK.CwBridge.signAndBroadcast(wallet, txList, { gas: gas, fee: fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}