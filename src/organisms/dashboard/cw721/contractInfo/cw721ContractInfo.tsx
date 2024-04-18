import { Fragment } from "react";
import { useTheme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import { ICw721ContractInfo } from "interfaces/cw721";
import CustomRow from "components/table/row/customRow";
import ContractInfo from "./contractInfo";
import OwnershipInfo from "./ownership";
import OwnerNftsInfo from "./ownerNftsInfo";
import Address from "components/text/address";

interface IProps {
  cw721ContractInfo: ICw721ContractInfo | null;
  walletAddress: string;
}

const Cw721ContractInfo = ({ cw721ContractInfo, walletAddress }: IProps) => {
  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"Cw721 Contract Info"}
      </Typography>
      <TableWithNoHeader rows={
        <Fragment>
          <ContractInfo title={"Contract"} cw721ContractInfo={cw721ContractInfo?.contractInfo} />
          <OwnershipInfo title={"Ownership"} ownership={cw721ContractInfo?.ownership} walletAddress={walletAddress} />
          <CustomRow title={"Minter"} merge={true} children={
            <Fragment>
              {cw721ContractInfo === undefined ? "-" :
                walletAddress === cw721ContractInfo?.minter ?
                  <Address address={cw721ContractInfo?.minter} tabType={"WALLET"} /> :
                  <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                    {cw721ContractInfo?.minter}
                  </Typography>
              }
            </Fragment>
          } />
          <CustomRow title={"TotalSupply"} merge={true} children={<Fragment>{<Typography variant="body2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{cw721ContractInfo?.totalSupply}</Typography>}</Fragment>} />
          <OwnerNftsInfo title={"OwnerNfts"} ownerNfts={cw721ContractInfo?.ownerNfts} />
        </Fragment>
      } />
    </Stack>
  )
}

export default Cw721ContractInfo;