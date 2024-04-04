import { FirmaSDK } from "@firmachain/firma-js";

export const getKeyType = async (key: string, firmaSDK: FirmaSDK) => {
  const privateKeyPattern = /^0x[a-fA-F0-9]{64}$/;
  try {
    if (privateKeyPattern.test(key)) {
      const wallet = await firmaSDK.Wallet.fromPrivateKey(key);
      const address = await wallet.getAddress();

      return "PRIVATE_KEY";
    } else {
      const wallet = await firmaSDK.Wallet.fromMnemonic(key);
      const address = await wallet.getAddress();
      
      return "MNEMONIC";
    }
  } catch (error) {
    console.log("IS VALID KEY");
    return "INVALID";
  }
}

export const shortenAddress = (address: string, startLength = 12, endLength = 12) => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}