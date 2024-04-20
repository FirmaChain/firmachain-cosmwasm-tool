import { IBurn, IBurnBulk, IBurnFrom, IBurnFromBulk, ICw20TokenInfo, IDecreaseAllowance, IGetAllAccounts, IGetAllAllowances, IGetAllSpenderAllowances, IGetAllowance, IGetBalance, IGetCw20AddressInfo, IGetCw20ContractInfo, IGetDownloadLogo, IGetMarketingInfo, IGetMinter, IGetTotalSupply, IIncreaseAllowance, IInstantiateContract, IMint, IMintBulk, ISend, ISendFrom, IStoreCode, ITransfer, ITransferBulk, ITransferFrom, ITransferFromBulk, IUpdateLogo, IUpdateMarketing, IUpdateMinter } from "interfaces/cw20";
import { BurnBulk } from "organisms/bulk/cw20/tx/burnBulk";
import { BurnFromBulk } from "organisms/bulk/cw20/tx/burnFromBulk";
import { MintBulk } from "organisms/bulk/cw20/tx/mintBulk";
import { TransferBulk } from "organisms/bulk/cw20/tx/transferBulk";
import { TransferFromBulk } from "organisms/bulk/cw20/tx/transferFromBulk";
import { Burn } from "organisms/feature/cw20/tx/burn";
import { BurnFrom } from "organisms/feature/cw20/tx/burnFrom";
import { DecreaseAllowance } from "organisms/feature/cw20/tx/decreaseAllowance";
import { IncreaseAllowance } from "organisms/feature/cw20/tx/increaseAllowance";
import { InstantiateContract } from "organisms/feature/cw20/tx/instantiateContract";
import { Mint } from "organisms/feature/cw20/tx/mint";
import { Send } from "organisms/feature/cw20/tx/send";
import { SendFrom } from "organisms/feature/cw20/tx/sendFrom";
import { StoreCode } from "organisms/feature/cw20/tx/storeCode";
import { Transfer } from "organisms/feature/cw20/tx/transfer";
import { TransferFrom } from "organisms/feature/cw20/tx/transferFrom";
import { UpdateLogo } from "organisms/feature/cw20/tx/updateLogo";
import { UpdateMarketing } from "organisms/feature/cw20/tx/updateMarketing";
import { UpdateMinter } from "organisms/feature/cw20/tx/updateMinter";

// TRANSACTIONS
export const storeCode = ({ firmaSDK, wallet, bufferArray, accessConfig }: IStoreCode) => {
  return StoreCode({ firmaSDK, wallet, bufferArray, accessConfig });
};

export const instantiateContract = ({ firmaSDK, wallet, admin, codeId, label, message, funds }: IInstantiateContract) => {
  return InstantiateContract({ firmaSDK, wallet, admin, codeId, label, message, funds });
};

export const increaseAllowance = ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IIncreaseAllowance) => {
  return IncreaseAllowance({ firmaSDK, wallet, contractAddress, spender, amount, expires });
};

export const decreaseAllowance = ({ firmaSDK, wallet, contractAddress, spender, amount, expires }: IDecreaseAllowance) => {
  return DecreaseAllowance({ firmaSDK, wallet, contractAddress, spender, amount, expires });
};

export const send = ({ firmaSDK, wallet, contractAddress, targetContractAddress, amount, message }: ISend) => {
  return Send({ firmaSDK, wallet, contractAddress, targetContractAddress, amount, message });
};

export const sendFrom = ({ firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount, message }: ISendFrom) => {
  return SendFrom({ firmaSDK, wallet, contractAddress, targetContractAddress, owner, amount, message });
};

export const transfer = ({ firmaSDK, wallet, contractAddress, recipient, amount }: ITransfer) => {
  return Transfer({ firmaSDK, wallet, contractAddress, recipient, amount });
};

export const transferFrom = ({ firmaSDK, wallet, contractAddress, owner, recipient, amount }: ITransferFrom) => {
  return TransferFrom({ firmaSDK, wallet, contractAddress, owner, recipient, amount });
};

export const burn = ({ firmaSDK, wallet, contractAddress, amount }: IBurn) => {
  return Burn({ firmaSDK, wallet, contractAddress, amount });
};

export const burnFrom = ({ firmaSDK, wallet, contractAddress, owner, amount }: IBurnFrom) => {
  return BurnFrom({ firmaSDK, wallet, contractAddress, owner, amount });
};

export const mint = ({ firmaSDK, wallet, contractAddress, recipient, amount }: IMint) => {
  return Mint({ firmaSDK, wallet, contractAddress, recipient, amount });
};

export const updateMinter = ({ firmaSDK, wallet, contractAddress, new_minter }: IUpdateMinter) => {
  return UpdateMinter({ firmaSDK, wallet, contractAddress, new_minter });
};

export const updateMarketing = ({ firmaSDK, wallet, contractAddress, description, marketing, project }: IUpdateMarketing) => {
  return UpdateMarketing({ firmaSDK, wallet, contractAddress, description, marketing, project });
};

export const updateLogo = ({ firmaSDK, wallet, contractAddress, url }: IUpdateLogo) => {
  return UpdateLogo({ firmaSDK, wallet, contractAddress, url });
};

// QUERY
export const useCw20ContractInfo = ({ firmaSDK, contractAddress, ownerAddress }: IGetCw20ContractInfo) => {
  const executeQuery = async () => {
    try {
      if (firmaSDK === null || contractAddress === "" || ownerAddress === "") return;
      
      const totalSupply = await firmaSDK.Cw20.getTotalSupply(contractAddress);
      const minter = await firmaSDK.Cw20.getMinter(contractAddress);
      const marketingInfo = await firmaSDK.Cw20.getMarketingInfo(contractAddress);
      const downloadLogo = await getDownloadLogo({ firmaSDK, contractAddress });
      const tokenInfoStr = await firmaSDK.Cw20.getTokenInfo(contractAddress);
      const balance = await firmaSDK.Cw20.getBalance(contractAddress, ownerAddress);
      const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress, ownerAddress);
      const tokenInfo: ICw20TokenInfo = JSON.parse(JSON.stringify(tokenInfoStr));
      marketingInfo.logo.url = downloadLogo;

      return {
        data: {
          totalSupply, minter, tokenInfo, balance, 
          marketingInfo, downloadLogo,
          allAllowances
        }
      };
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};

export const useCw20AddressInfo = ({ firmaSDK, contractAddress, address }: IGetCw20AddressInfo) => {
  const executeQuery = async () => {
    try {
      const balance = await firmaSDK.Cw20.getBalance(contractAddress, address);      
      const allAllowances = await firmaSDK.Cw20.getAllAllowances(contractAddress, address);
      const allSpenderAllowances = await firmaSDK.Cw20.getAllSpenderAllowances(contractAddress, address);

      return {
        data: {
          balance, allAllowances, allSpenderAllowances
        }
      }
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
};


export const getBalance = ({ firmaSDK, contractAddress, address }: IGetBalance) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getBalance(contractAddress, address);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getTotalSupply = ({ firmaSDK, contractAddress }: IGetTotalSupply) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getTotalSupply(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getMinter = ({ firmaSDK, contractAddress }: IGetMinter) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getMinter(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getAllowance = ({ firmaSDK, contractAddress, owner, spender }: IGetAllowance) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getAllowance(contractAddress, owner, spender);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getAllAllowances = ({ firmaSDK, contractAddress, owner }: IGetAllAllowances) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getAllAllowances(contractAddress, owner);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getAllSpenderAllowances = ({ firmaSDK, contractAddress, spender }: IGetAllSpenderAllowances) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getAllSpenderAllowances(contractAddress, spender);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getAllAccounts = ({ firmaSDK, contractAddress }: IGetAllAccounts) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getAllAccounts(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getMarketingInfo = ({ firmaSDK, contractAddress }: IGetMarketingInfo) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getMarketingInfo(contractAddress);
      return queryResult;
    } catch (error: any) {
      console.log(error);
      throw new Error(error);
    }
  }
  return executeQuery();
}

export const getDownloadLogo = ({ firmaSDK, contractAddress }: IGetDownloadLogo) => {
  const executeQuery = async () => {
    try {
      const queryResult = await firmaSDK.Cw20.getDownloadLogo(contractAddress);
      return queryResult;
    } catch (error: any) {
      return "";
    }
  }
  return executeQuery();
};

// BULK TX
export const transferBulk = ({ firmaSDK, wallet, contractAddress, transferBulkTargets }: ITransferBulk) => {
  return TransferBulk({ firmaSDK, wallet, contractAddress, transferBulkTargets });
};

export const transferFromBulk = ({ firmaSDK, wallet, contractAddress, transferFromBulkTargets }: ITransferFromBulk) => {
  return TransferFromBulk({ firmaSDK, wallet, contractAddress, transferFromBulkTargets });
};

export const burnBulk = ({ firmaSDK, wallet, contractAddress, amountArray }: IBurnBulk) => {
  return BurnBulk({ firmaSDK, wallet, contractAddress, amountArray });
};

export const burnFromBulk = ({ firmaSDK, wallet, contractAddress, burnFromBulkTargets }: IBurnFromBulk) => {
  return BurnFromBulk({ firmaSDK, wallet, contractAddress, burnFromBulkTargets });
};

export const mintBulk = ({ firmaSDK, wallet, contractAddress, mintBulkTargets }: IMintBulk) => {
  return MintBulk({ firmaSDK, wallet, contractAddress, mintBulkTargets });
};