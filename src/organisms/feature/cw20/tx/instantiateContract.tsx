import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IInstantiateContract } from "interfaces/cw20";

export const getInstantiateContract = async ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const gas = await firmaSDK.CosmWasm.getGasEstimationInstantiateContract(wallet, admin, codeId, label, message, funds);
    const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const InstantiateContract = async ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    console.log(message);
    const gas = await firmaSDK.CosmWasm.getGasEstimationInstantiateContract(wallet, admin, codeId, label, message, funds);
    const fee = Math.ceil(gas * 0.1);

    console.log(fee);
    const txResult = await firmaSDK.CosmWasm.instantiateContract(wallet, admin, codeId, label, message, funds, { gas: gas, fee: fee });

    const data = JSON.parse(txResult.rawLog!);
    const contractAddress = data[0]["events"][0]["attributes"][0]["value"];

    return contractAddress;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}