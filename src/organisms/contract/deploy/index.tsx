import { Fragment } from "react";
import { Box } from "@mui/material";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import Cw20 from "./cw20";
import Cw721 from "./cw721";

interface IProps {
  tab: number;
  wallet: FirmaWalletService | null;
  address: string;
  firmaSDK: FirmaSDK | null;
}

const Deploy = ({ tab, wallet, address, firmaSDK }: IProps) => {
  return (
    <Fragment>
      <Box sx={{ display: tab === 0 ? "block" : "none" }}>
        <Cw20 wallet={wallet} address={address} firmaSDK={firmaSDK} />
      </Box>
      <Box sx={{ display: tab === 1 ? "block" : "none" }}>
        <Cw721 wallet={wallet} firmaSDK={firmaSDK} />
      </Box>
    </Fragment>
  );
};

export default Deploy;
