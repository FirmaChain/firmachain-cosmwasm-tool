import { Fragment, useCallback, useMemo } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ContentCopy } from "@mui/icons-material";
import { Stack, Typography, useTheme } from "@mui/material";

import Toast from "components/toast";
import { TAB_TYPE } from "constants/common";

import WALLET_LOGO from "assets/wallet-logo.png";
import TOKEN_LOGO from "assets/token-logo.png";

interface IProps {
  address: string;
  tabType: TAB_TYPE | "WALLET";
  copyAddress?: string | null | undefined;
}

const Address = ({ address, tabType, copyAddress = address }: IProps) => {
  const theme = useTheme();
  const style = useMemo(() => {
    if (tabType === "WALLET") return { color: "#2273e3", fontWeight: "500" };
    if (tabType === "Cw20") return { color: "#189334", fontWeight: "500" };
    return {};
  }, [tabType]);

  const VerifyMark = useCallback(() => {
    if (tabType === "WALLET") return <img src={WALLET_LOGO} alt={"metamask"} style={{ width: "16px", height: "16px", objectFit: "contain" }} />;
    if (tabType === "Cw20") return <img src={TOKEN_LOGO} alt={"cw20"} style={{ width: "16px", height: "16px", objectFit: "contain" }} />;
}, [tabType]);

  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"}>
      {address !== null && address !== undefined && address !== "" && copyAddress !== null && copyAddress !== undefined && copyAddress !== "" ? (
        <Fragment>
          <VerifyMark />
          <Typography variant="body2" sx={{ ...style, fontSize: "0.7rem" }}>
            {address}
          </Typography>
          <CopyToClipboard text={address} onCopy={() => Toast({ message: "The address has been copied to the clipboard.", variant: "success" })}>
            <ContentCopy sx={{ width: "15px", cursor: "pointer", color: theme.palette.grey[500] }} />
          </CopyToClipboard>
        </Fragment>
      ) : (
        <Typography variant="body2" sx={{ ...style }}>
          {"-"}
        </Typography>
      )
      }
    </Stack >
  )
}

export default Address;