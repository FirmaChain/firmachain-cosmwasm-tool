import { Fragment } from "react";
import { Stack, Typography } from "@mui/material";

import CustomRow from "components/table/row/customRow";
import Address from "components/text/address";

interface IProps {
  title: string;
  owner: string;
  description: string;
  project: string;
  logo: string;
  walletAddress: string;
}

const MarketingInfo = ({ title, owner, description, project, logo, walletAddress }: IProps) => {
  return (
    <Fragment>
      <CustomRow
        title={title}
        rowSpan={4}
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
            {walletAddress === owner ?
              <Address address={owner} tabType={"WALLET"} /> :
              <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                {owner}
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
              {"Description"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {description}
            </Typography>
          </Stack>
        }
      />
      <CustomRow
        title={title}
        rowSpan={0}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Project"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {project}
            </Typography>
          </Stack>
        }
      />
      <CustomRow
        title={title}
        rowSpan={0}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Logo"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {logo === "" ? "-" : logo}
            </Typography>
          </Stack>
        }
      />
    </Fragment>
  )
};

export default MarketingInfo;