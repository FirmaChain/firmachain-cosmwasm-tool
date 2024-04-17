import { useSelector } from "react-redux";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";
import { Stack } from "@mui/material";
import { rootState } from "store/reducers";
import StoreCode from "./storeCode/storeCode";
import InstantiateContract from "./instantiateContract/instantiateContract";

interface IProps {
  wallet: FirmaWalletService | null;
  firmaSDK: FirmaSDK | null;
}

const Cw721 = ({ wallet, firmaSDK }: IProps) => {  
  return (
    <Stack gap={"10px"}>
      <StoreCode firmaSDK={firmaSDK} wallet={wallet} />
      <InstantiateContract firmaSDK={firmaSDK} wallet={wallet} />
    </Stack>
  );
}

export default Cw721;