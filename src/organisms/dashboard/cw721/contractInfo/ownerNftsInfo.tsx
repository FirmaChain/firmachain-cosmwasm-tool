import { Stack, Typography, useTheme } from "@mui/material";
import CustomRow from "components/table/row/customRow";
import { Fragment } from "react";

interface IProps {
  title: string;
  ownerNfts: string[];
}

const OwnerNftsInfo = ({ title, ownerNfts }: IProps) => {
  const theme = useTheme();

  return (
    <Fragment>
      <CustomRow
        rowSpan={1}
        merge={true}
        title={title}
        children={
          <Stack gap={"3px"} alignItems={"flex-start"} justifyContent={"flex-start"} sx={{ maxWidth: "100%", maxHeight: "100px", overflow: "overlay" }}>
            {ownerNfts === undefined || ownerNfts === null ? (
              "-"
            ) : (
              <Stack flexDirection={"row"} gap={"5px"} flexWrap={"wrap"}>
                {ownerNfts.map((value, index) => {
                  const existAtLockList = ownerNfts.find((val) => val === value);
                  return (
                    <Stack
                      key={index}
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{
                        minWidth: "20px",
                        padding: "5px",
                        borderRadius: "4px",
                        backgroundColor: `${theme.palette.success.light}30`,
                        border: existAtLockList !== undefined ? `2px solid ${theme.palette.info.light}70` : "none",
                      }}
                    >
                      <Typography variant="body2">{value}</Typography>
                    </Stack>
                  );
                })}
              </Stack>
            )}
          </Stack>
        }
        childrenWidth={"auto"}
      />
    </Fragment>
  )
}

export default OwnerNftsInfo;