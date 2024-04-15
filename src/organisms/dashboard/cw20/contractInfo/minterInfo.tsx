import { Stack, Typography } from "@mui/material";
import CustomRow from "components/table/row/customRow";
import Address from "components/text/address";
import useFirmaSDK from "hooks/useFirmaSDK";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { formatNumberWithComma } from "utils/number";

interface IProps {
  title: string;
  minterAddress: string;
  minterCap: string;
  walletAddress: string;
}

const MinterInfo = ({ title, minterAddress, minterCap, walletAddress }: IProps) => {
  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  
  return (
    <Fragment>
      <CustomRow
        title={title}
        rowSpan={2}
        children={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {"Address"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            {walletAddress === minterAddress ?
              <Address address={minterAddress} tabType={"WALLET"} /> :
              <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                {minterAddress}
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
              {"Cap"}
            </Typography>
          </Stack>
        }
        childrenWidth={"auto"}
        children2={
          <Stack justifyContent={"flex-start"} sx={{ minWidth: "170px" }}>
            <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
              {formatNumberWithComma(minterCap, Cw20Decimal)}
            </Typography>
          </Stack>
        }
      />
    </Fragment>
  )
}

export default MinterInfo;