import { Stack, Typography } from "@mui/material";
import CustomRow from "components/table/row/customRow";
import Address from "components/text/address";
import { IOwnershipResponse } from "interfaces/cw721";
import { Fragment } from "react";

interface IProps {
  title: string;
  ownership: IOwnershipResponse;
  walletAddress: string;
}

const OwnershipInfo = ({ title, ownership, walletAddress }: IProps) => {
  return (
    <Fragment>
      <CustomRow
        title={title}
        rowSpan={3}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Owner"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            {ownership === undefined ? "-" :
              walletAddress === ownership.owner ?
              <Address address={ownership.owner} tabType={"WALLET"} /> :
              <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                {ownership.owner}
              </Typography>
            }
          </Stack>
        }
      />
      <CustomRow
        title={title}
        rowSpan={0}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Pending Owner"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            {ownership === undefined ? "-" :
              walletAddress === ownership.pending_owner ?
              <Address address={ownership.pending_owner} tabType={"WALLET"} /> :
              <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                {ownership.pending_owner}
              </Typography>
            }
          </Stack>
        }
      />
      <CustomRow
        title={title}
        rowSpan={0}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Pending Expiry"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {ownership === undefined ? "-" : JSON.stringify(ownership.pending_expiry)}
            </Typography>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default OwnershipInfo;