import { BUFFER_ARRAY_UNDEFINED, FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IStoreCode } from "interfaces/cw20";

export const getStoreCodeFee = async ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  try {
    if (firmaSDK === undefined || firmaSDK === null) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined || wallet === null) throw WALLET_UNDEFINED;
    if (bufferArray === undefined || bufferArray === null) throw BUFFER_ARRAY_UNDEFINED;

    const gas = await firmaSDK.CosmWasm.getGasEstimationStoreCode(wallet, bufferArray, accessConfig);
    const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const StoreCode = async ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  try {
    if (firmaSDK === undefined || firmaSDK === null) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined || wallet === null) throw WALLET_UNDEFINED;
    if (bufferArray === undefined || bufferArray === null) throw BUFFER_ARRAY_UNDEFINED;

    const gas = await firmaSDK.CosmWasm.getGasEstimationStoreCode(wallet, bufferArray, accessConfig);
    const fee = Math.ceil(gas * 0.1);

    // const gas = 3000000;
		// const fee = FirmaUtil.getUFCTFromFCT(0.3);
    
    const txResult = await firmaSDK.CosmWasm.storeCode(wallet, bufferArray, accessConfig, { gas: gas, fee: fee });

    const data = JSON.parse(txResult.rawLog!);
    const codeId = data[0]["events"][1]["attributes"][1]["value"];

    return codeId;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};