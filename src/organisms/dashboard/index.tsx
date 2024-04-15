import { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Stack, Tab, Tabs } from "@mui/material";

import MainCard from "components/card/mainCard";

import { rootState } from "store/reducers";
import useFirmaSDK from "hooks/useFirmaSDK";

import Info from "./info/info";
import DashboardCw20 from "./cw20";

import { TABS } from "constants/common";

const Dashboard = () => {
  const { address } = useFirmaSDK();
  const {
    Cw20ContractAddress,
  } = useSelector((state: rootState) => state.contract);

  const [tab, setTab] = useState<number>(0);

  const tabs = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    }
  };

  const onChangeClickTab = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, newTabIndex: number) => {
    event.stopPropagation();
    setTab(newTabIndex);
  };

  return (
    <Stack flexGrow={1} width={"100%"}>
      <MainCard title={"Dashboard"} darkTitle={true}>
        <Stack gap={"30px"}>
          <Info
            address={address}
            cw20ContractAddress={Cw20ContractAddress}
          />
          <Tabs value={tab} onChange={onChangeClickTab}>
            {TABS.map((value, index) => {
              return <Tab key={`info-tabs-${index}`} label={value} sx={{ fontSize: "0.8rem" }} {...tabs(index)} />;
            })}
          </Tabs>
          <Box sx={{ display: tab === 0 ? "block" : "none" }}>
            <DashboardCw20 />
          </Box>
        </Stack>
      </MainCard>
    </Stack>
  )
};

export default Dashboard;