import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box component={"main"} sx={{ width: "100%", overflowX: "hidden", flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;