import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

import { rootState } from "store/reducers";
import { ContractActions } from "store/action";

import SmallToggleButton from "components/button/smallToggleButton";
import { NETWORKS, NETWORK_TYPE } from "constants/common";

const SwitchNetwork = () => {
  const { targetNetwork } = useSelector((state: rootState) => state.contract);
  const [network, setNetwork] = useState<string>(NETWORKS[0]);

  const handleChange = (newNetwork: NETWORK_TYPE) => {
    setNetwork(newNetwork);
    ContractActions.handleNetwork(newNetwork);
  };

  useEffect(() => {
    if (targetNetwork !== null) {
      setNetwork(targetNetwork);
    }
  }, [targetNetwork]);

  return (
    <Stack flexDirection={"row"} alignItems={"center"} gap={"10px"} padding={"0 20px"}>
      <SmallToggleButton title={"MAINNET"} variant={"success"} active={network === NETWORKS[0]} onClick={() => handleChange(NETWORKS[0])} />
      <SmallToggleButton title={"TESTNET"} variant={"success"} color={"error"} active={network === NETWORKS[1]} onClick={() => handleChange(NETWORKS[1])} />
    </Stack>
  );
};

export default SwitchNetwork;
