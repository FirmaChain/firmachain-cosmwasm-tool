import { FIRMASDK_UNDEFINED, WALLET_UNDEFINED } from "constants/message";
import { IUpdateLogo } from "interfaces/cw20";

export const getUpdateLogoFee = async ({ firmaSDK, wallet, contractAddress, url }: IUpdateLogo) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const gas = await firmaSDK.Cw20.getGasEstimationUploadLogo(wallet, contractAddress, url);
		const fee = Math.ceil(gas * 0.1);

		return fee;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const UpdateLogo = async ({ firmaSDK, wallet, contractAddress, url }: IUpdateLogo) => {
  try {
    if (firmaSDK === undefined) throw FIRMASDK_UNDEFINED;
    if (wallet === undefined) throw WALLET_UNDEFINED;

    const gas = await firmaSDK.Cw20.getGasEstimationUploadLogo(wallet, contractAddress, url);
		const fee = Math.ceil(gas * 0.1);

		const txResult = await firmaSDK.Cw20.uploadLogo(wallet, contractAddress, url, { gas, fee });
		console.log(txResult);
    return txResult;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}