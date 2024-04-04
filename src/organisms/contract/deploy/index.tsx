import { Fragment } from "react";
import { Box } from "@mui/material";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js";

import Cw20 from "./cw20";

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
    </Fragment>
  );
};

export default Deploy;
