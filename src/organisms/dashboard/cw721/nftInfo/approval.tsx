import { Cw721Approval } from "@firmachain/firma-js";
import { TableCell, TableRow, Typography } from "@mui/material";

import CustomRow from "components/table/row/customRow";
import TableWithHeader from "components/table/tableWithHeader";

interface IProps {
  approvals: Cw721Approval[];
}

const ApprovalsInfo = ({ approvals }: IProps) => {
  const headers: string[] = ["Spender", "Expires"];

  return (
    <CustomRow title={"Approvals"} colSpan={2} merge={true} children={
      <TableWithHeader
        headers={headers}
        rows={!approvals ? <></> : approvals.map((value, index) => {
          return (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="body2">{value.spender}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{JSON.stringify(value.expires)}</Typography>
              </TableCell>
            </TableRow>
          )
        })}
      />
    } />
  )
}

export default ApprovalsInfo;