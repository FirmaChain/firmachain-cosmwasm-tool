import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";

import InstantiateContract from "./instantiateContract/instantiateContract";
import StoreCode from "./storeCode/storeCode";

interface IProps {
  wallet: FirmaWalletService | null;
  address: string;
  firmaSDK: FirmaSDK | null;
}

const Cw20 = ({ wallet, address, firmaSDK }: IProps) => {
  return (
    <Stack gap={"10px"}>
      <StoreCode firmaSDK={firmaSDK} wallet={wallet} />
      <InstantiateContract firmaSDK={firmaSDK} address={address} wallet={wallet} />
    </Stack>
  );
};

export default Cw20;
