import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FirmaConfig, FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import { rootState } from "../store/reducers";
import { NETWORKS } from "../constants/common";
import { getKeyType } from "utils/address";

const useFirmaSDK = () => {
  const { targetNetwork, targetMnemonic } = useSelector((state: rootState) => state.contract);

  const [firmaSDK, setFirmaSDK] = useState<FirmaSDK | null>(null);
  const [wallet, setWallet] = useState<FirmaWalletService | null>(null);
  const [address, setAddress] = useState<string>("");
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const initializeFirmaSDK = async () => {
      if (targetNetwork === NETWORKS[0]) {
        const newFirmaSDK = new FirmaSDK(FirmaConfig.MainNetConfig);
        newFirmaSDK.Config.isShowLog = false;
        setFirmaSDK(newFirmaSDK);
      } else {
        const newFirmaSDK = new FirmaSDK(FirmaConfig.TestNetConfig);
        setFirmaSDK(newFirmaSDK);
      }
    }
    initializeFirmaSDK();
  }, [targetNetwork]);

  useEffect(() => {
    const initializeWallet = async () => {
      if (!firmaSDK || targetMnemonic === "") return;

      const keyType = await getKeyType(targetMnemonic, firmaSDK);
      if (keyType === "MNEMONIC") {
        const newWallet = await firmaSDK.Wallet.fromMnemonic(targetMnemonic);
        setWallet(newWallet);
      } else if (keyType === "PRIVATE_KEY") {
        const newWallet = await firmaSDK.Wallet.fromPrivateKey(targetMnemonic);
        setWallet(newWallet);
      }
    }

    if (firmaSDK) {
      initializeWallet();
    }
  }, [firmaSDK, targetMnemonic]);

  useEffect(() => {
    const initializeAddress = async () => {
      if (!wallet) return;
      const newAddress = await wallet.getAddress();
      setAddress(newAddress);
      setIsReady(true);
    }

    if (wallet) {
      initializeAddress();
    }
  }, [wallet]);

  return {
    firmaSDK,
    wallet,
    address,
    isReady
  }
}

export default useFirmaSDK;