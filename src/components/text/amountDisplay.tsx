import { Stack, Typography } from "@mui/material";
import { Fragment, useMemo, useState } from "react";

interface IProps {
  label: string;
  amount: string;
  symbol: string;
}

const AmountDisplay = ({ label, amount, symbol }: IProps) => {
  const hasDecimal = useMemo(() => {
    const check = Boolean(amount.includes("."));

    return true;
  }, [amount]);

  const testAmount1 = "123,456";
  const testAmount2 = "123,456.998877";
  const testSymbol = "FCT";

  return (
    <Stack direction={"row"} justifyContent={"space-between"} mt={"2px"}>
      <Typography sx={{ color: "grey", fontSize: "13px" }}>{label}</Typography>
      <Stack>
        {!hasDecimal ? 
          <Stack direction={"row"} sx={{ alignItems: "flex-end" }} gap={.5}>
            <Typography sx={{ fontSize: "13px" }}>{testAmount1}</Typography>
            <Typography sx={{ fontSize: "11px" }}>{symbol}</Typography>
          </Stack>
          :
          <Stack direction={"row"} sx={{ alignItems: "flex-end" }} gap={.5}>
            <Stack direction={"row"} sx={{ alignItems: "flex-end" }}>
              <Typography sx={{ fontSize: "13px" }}>{amount.split(".")[0]}</Typography>
              <Typography sx={{ fontSize: "13px" }}>{"."}</Typography>
              <Typography sx={{ fontSize: "11px" }}>{amount.split(".")[1]}</Typography>
            </Stack>
            <Typography sx={{ fontSize: "11px" }}>{symbol}</Typography>
          </Stack>
        }
      </Stack>
    </Stack>
  )
}

export default AmountDisplay;