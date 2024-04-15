import { Fragment } from "react";
import { Stack, Typography } from "@mui/material";

import CustomRow from "components/table/row/customRow";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import Address from "components/text/address";

interface IProps {
  address: string;
  cw20ContractAddress: string;
};

const Info = ({ address, cw20ContractAddress }: IProps) => {
  console.log(cw20ContractAddress);
  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"Info"}
      </Typography>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CustomRow title={"Wallet Address"} merge={true} children={<Address address={address} tabType={"WALLET"} />} />
            <CustomRow title={"Cw20 ContractAddress"} merge={true} children={<Address address={cw20ContractAddress} tabType={"Cw20"} />} />
          </Fragment>
        }
      />
    </Stack>
  )
};

export default Info;