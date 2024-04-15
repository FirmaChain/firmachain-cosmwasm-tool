import { Fragment } from "react";
import { Stack, Typography } from "@mui/material";

import CustomRow from "components/table/row/customRow";
import { formatNumberWithComma } from "utils/number";

interface IProps {
  title: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
}

const TokenInfo = ({ title, name, symbol, decimals, totalSupply }: IProps) => {
  return (
    <Fragment>
      <CustomRow
        title={title}
        rowSpan={4}
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
              {name}
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
              {symbol}
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
              {"Decimals"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {decimals}
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
              {"Total Supply"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {formatNumberWithComma(totalSupply, decimals)}
            </Typography>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default TokenInfo;