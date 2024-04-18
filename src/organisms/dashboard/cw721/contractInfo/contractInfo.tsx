import { Cw721ContractInfo } from "@firmachain/firma-js";
import { Stack, Typography } from "@mui/material";
import CustomRow from "components/table/row/customRow";
import { Fragment } from "react";

interface IProps {
  title: string;
  cw721ContractInfo: Cw721ContractInfo;
}

const ContractInfo = ({ title, cw721ContractInfo }: IProps) => {
  return (
    <Fragment>
      <CustomRow
        title={title}
        rowSpan={2}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Name"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {cw721ContractInfo === undefined ? "-" : cw721ContractInfo.name}
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
              {"Symbol"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {cw721ContractInfo === undefined ? "-" : cw721ContractInfo.symbol}
            </Typography>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default ContractInfo;