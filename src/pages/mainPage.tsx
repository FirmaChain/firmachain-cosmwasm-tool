import { Stack } from "@mui/material"

import Operate from "organisms/operate";
import Dashboard from "organisms/dashboard";

const MainPage = () => {
  return (
    <Stack flexDirection={'row'} alignItems={'flex-start'} gap={"20px"}>
      <Operate />
      <Dashboard />
    </Stack>
  )
}

export default MainPage;