import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IUpdateMinter } from "interfaces/cw20";

export const getUpdateMinterFee = async ({ firmaSDK, wallet, contractAddress, new_minter }: IUpdateMinter) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationUpdateMinter(wallet, contractAddress, new_minter);
    const fee = Math.ceil(gas * 0.1);
  
    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const UpdateMinter = async ({ firmaSDK, wallet, contractAddress, new_minter }: IUpdateMinter) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationUpdateMinter(wallet, contractAddress, new_minter);
    const fee = Math.ceil(gas * 0.1);
  
    const txResult = await firmaSDK.Cw20.updateMinter(wallet, contractAddress, new_minter, { gas, fee });
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}