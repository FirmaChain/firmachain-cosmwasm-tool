import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import Contract from "organisms/contract";
import Features from "organisms/feature";
import Bulk from "organisms/bulk";

import { rootState } from "store/reducers";
import { TABS } from "constants/common";

const Operate = () => {
  const { tab } = useSelector((state: rootState) => state.global);
  
  return (
    <Stack flexGrow={1} width={"100%"} gap={"15px"}>
      <Contract />
      <Features />
      {(tab === TABS[0] || tab === TABS[1]) && <Bulk />}
    </Stack>
  )
}

export default Operate;