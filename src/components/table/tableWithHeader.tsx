import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  headers: string[];
  rows: ReactNode;
}

const TableWithHeader = ({ headers, rows }: IProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((value, index) => {
              return (
                <TableCell key={index}>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.7rem", opacity: 0.7 }}>{value}</Typography>
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableWithHeader;
