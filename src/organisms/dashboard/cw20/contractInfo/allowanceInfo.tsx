import { TableCell, TableRow, Typography } from "@mui/material";
import CustomRow from "components/table/row/customRow";
import TableWithHeader from "components/table/tableWithHeader";
import { IAllowance } from "interfaces/cw20";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import { formatNumberWithComma } from "utils/number";

interface IProps {
  allowances: IAllowance[];
}

const AllowanceInfo = ({ allowances }: IProps) => {
  const headers: string[] = ["Spender", "Allowance", "Expires"];

  const { Cw20Decimal } = useSelector((state: rootState) => state.contract);
  
  return (
    <CustomRow title={"Allowances"} colSpan={3} merge={true} children={
      <TableWithHeader
        headers={headers}
        rows={!allowances ? <></> : allowances.map((value, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{value.spender}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{formatNumberWithComma(value.allowance, Cw20Decimal)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{JSON.stringify(value.expires)}</Typography>
              </TableCell>
            </TableRow>
          )
        })}
      />
    } />
  )
}

export default AllowanceInfo;