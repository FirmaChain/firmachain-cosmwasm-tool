import { IBurn, IBurnFrom, IDecreaseAllowance, IIncreaseAllowance, IInstantiateContract, IMint, ISend, ISendFrom, IStoreCode, ITransfer, ITransferFrom, IUpdateLogo, IUpdateMarketing, IUpdateMinter } from "interfaces/cw20";
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