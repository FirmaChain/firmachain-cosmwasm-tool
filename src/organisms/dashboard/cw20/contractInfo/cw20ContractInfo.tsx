import { Fragment } from "react";
import { Stack, Typography, useTheme } from "@mui/material";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import CustomRow from "components/table/row/customRow";
import { ICw20ContractInfo } from "interfaces/cw20";
import MarketingInfo from "./marketingInfo";
import TokenInfo from "./tokenInfo";
import MinterInfo from "./minterInfo";
import AllowanceInfo from "./allowanceInfo";
import { formatNumberWithComma } from "utils/number";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";

interface IProps {
  cw20ContractInfo: ICw20ContractInfo | null;
  walletAddress: string;
}

const Cw20ContractInfo = ({ cw20ContractInfo, walletAddress }: IProps) => {
  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  
  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"Cw20 Contract Info"}
      </Typography>
      <TableWithNoHeader rows={
        <Fragment>
          <TokenInfo title={"Token Info"} name={cw20ContractInfo?.tokenInfo.name} symbol={cw20ContractInfo?.tokenInfo.symbol} decimals={cw20ContractInfo?.tokenInfo.decimals} totalSupply={cw20ContractInfo?.tokenInfo.total_supply} />
          <MinterInfo title={"Minter Info"} minterAddress={cw20ContractInfo?.minter.minter} minterCap={cw20ContractInfo?.minter.cap} walletAddress={walletAddress}/>
          <MarketingInfo title={"Marketing Info"} owner={cw20ContractInfo?.marketingInfo.marketing} description={cw20ContractInfo?.marketingInfo.description} project={cw20ContractInfo?.marketingInfo.project} logo={cw20ContractInfo?.marketingInfo.logo.url} walletAddress={walletAddress} />
          <CustomRow title={"Balance"} merge={true} children={<Fragment>{<Typography variant="body2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{cw20ContractInfo?.balance === undefined || cw20ContractInfo?.balance === "0" ? "0" : formatNumberWithComma(cw20ContractInfo?.balance, Cw20Decimal)}</Typography>}</Fragment>} />
          <AllowanceInfo allowances={cw20ContractInfo?.allAllowances} />
        </Fragment>
      } />
    </Stack>
  )
}

export default Cw20ContractInfo;