import { Fragment } from "react";
import { Box } from "@mui/material";

import Cw20 from "./cw20";

interface IProps {
  tab: number;
}

const Recover = ({ tab }: IProps) => {
  return (
    <Fragment>
      <Box sx={{ display: tab === 0 ? "block" : "none" }}>
        <Cw20 />
      </Box>
    </Fragment>
  );
};

export default Recover;
