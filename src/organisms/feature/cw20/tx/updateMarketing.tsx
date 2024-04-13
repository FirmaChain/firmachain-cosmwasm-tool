import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IUpdateMarketing } from "interfaces/cw20";

export const getUpdateMarketingFee = async ({ firmaSDK, wallet, contractAddress, description, marketing, project }: IUpdateMarketing) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationUpdateMarketing(wallet, contractAddress, description, marketing, project);
    const fee = Math.ceil(gas * 0.1);

    return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const UpdateMarketing = async ({ firmaSDK, wallet, contractAddress, description, marketing, project }: IUpdateMarketing) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;
    
    const gas = await firmaSDK.Cw20.getGasEstimationUpdateMarketing(wallet, contractAddress, description, marketing, project);
    const fee = Math.ceil(gas * 0.1);

    const txResult = await firmaSDK.Cw20.updateMarketing(wallet, contractAddress, description, marketing, project, { gas, fee })
    console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}