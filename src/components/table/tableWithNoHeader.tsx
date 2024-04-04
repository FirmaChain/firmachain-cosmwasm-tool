import { Table, TableBody, TableContainer } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  rows: ReactNode;
}

const TableWithNoHeader = ({ rows }: IProps) => {
  return (
    <TableContainer>
      <Table>
        <TableBody sx={{ borderTop: "1px solid #f0f0f0" }}>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWithNoHeader;
