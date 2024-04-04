import { TableCell, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IRowProps {
  title: string;
  rowSpan?: number;
  colSpan?: number;
  children: ReactNode;
  children2?: ReactNode;
  padding?: string;
  merge?: boolean;
  childrenWidth?: string;
  children2Width?: string;
}
const CustomRow = ({ title, rowSpan = 1, colSpan = 1, children, children2, padding = "5px 10px", merge = false, childrenWidth = "100%", children2Width = "100%" }: IRowProps) => {
  return (
    <TableRow hover>
      {rowSpan > 0 ? (
        <TableCell
          rowSpan={rowSpan}
          sx={{
            textAlign: "center",
            borderRight: "1px solid #f0f0f0",
            width: "150px",
            minWidth: "150px",
            backgroundColor: "#ffffff",
            whiteSpace: "pre-line",
            padding: padding,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "500", fontSize: "0.7rem", opacity: 0.7 }}>
            {title}
          </Typography>
        </TableCell>
      ) : null}
      <TableCell
        colSpan={colSpan === 1 ? (merge ? 2 : 1) : colSpan}
        sx={{ padding: padding, textAlign: "left", fontWeight: 600, borderRight: merge ? "none" : "1px solid #f0f0f0", width: childrenWidth, boxSizing: "border-box" }}
      >
        {Array.isArray(children) ? children.map((child, index) => (
          <div key={index}>{child}</div>
        )) : children}
      </TableCell>
      {merge === false ? <TableCell sx={{ padding: padding, width: children2Width, boxSizing: "border-box" }}>{children2}</TableCell> : null}
    </TableRow>
  );
};

export default CustomRow;