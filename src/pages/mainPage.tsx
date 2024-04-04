import { Stack } from "@mui/material"

import Operate from "organisms/operate";

const MainPage = () => {
  return (
    <Stack flexDirection={'row'} alignItems={'flex-start'} gap={"20px"}>
      <Operate />
    </Stack>
  )
}

export default MainPage;