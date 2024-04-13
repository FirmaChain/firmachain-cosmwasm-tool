import { Stack } from "@mui/material";

import Contract from "organisms/contract";
import Features from "organisms/feature";

const Operate = () => {
  return (
    <Stack flexGrow={1} width={"100%"} gap={"15px"}>
      <Contract />
      <Features />
    </Stack>
  )
}

export default Operate;