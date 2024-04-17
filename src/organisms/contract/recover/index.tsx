import { Fragment } from "react";
import { Box } from "@mui/material";

import Cw20 from "./cw20";
import Cw721 from "./cw721";

interface IProps {
  tab: number;
}

const Recover = ({ tab }: IProps) => {
  return (
    <Fragment>
      <Box sx={{ display: tab === 0 ? "block" : "none" }}>
        <Cw20 />
      </Box>
      <Box sx={{ display: tab === 1 ? "block" : "none" }}>
        <Cw721 />
      </Box>
    </Fragment>
  );
};

export default Recover;
