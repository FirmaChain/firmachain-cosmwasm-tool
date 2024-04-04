import { Fragment, useEffect, useMemo, useState } from "react";
import { Stack, Tab, Tabs, Typography } from "@mui/material";

import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import SmallButton from "components/button/smallButton";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import CustomCard from "components/card/customCard";
import Accordion from "components/accordion/accordion";
import SwitchMode from "./switchMode";
import SwitchNetwork from "./switchNetwork";

import useFirmaSDK from "hooks/useFirmaSDK";
import { ContractActions, GlobalActions } from "store/action";
import { TABS } from "constants/common";
import { getKeyType } from "utils/address";

import Deploy from "./deploy";

const tabProps = (tabIndex: number) => {
  return {
    id: `tab-${tabIndex}`,
    "aria-controls": `tabpanel-${tabIndex}`,
  };
}

const Contract = () => {
  const { wallet, firmaSDK, address } = useFirmaSDK();

  const [mode, setMode] = useState<boolean>(false);
  const [tab, setTab] = useState<number>(0);

  const [inputMnemonic, setInputMnemonic] = useState<string>("");
  const [isValidKey, setIsValidKey] = useState(false);

  const onChangeMode = (isRecoverMode: boolean) => {
    setMode(isRecoverMode);
  };

  const onChangeTab = (event: React.SyntheticEvent, newTabIndex: number) => {
    event.stopPropagation();
    setTab(newTabIndex);
    GlobalActions.handleTab(TABS[newTabIndex]);
  };

  const onChangeMnemonic = (value: string) => {
    setInputMnemonic(value);
  }

  useEffect(() => {
    const checkKeyType = async () => {
      const keyType = await getKeyType(inputMnemonic, firmaSDK);
      setIsValidKey(keyType !== "INVALID");
    };

    if (inputMnemonic) {
      checkKeyType();
    } else {
      setIsValidKey(true);
    }
  }, [inputMnemonic]);

  const active = useMemo(() => {
    return inputMnemonic === "" || !isValidKey;
  }, [inputMnemonic, isValidKey]);

  const onClickMnemonicRegister = () => {
    ContractActions.handleMnemonic(inputMnemonic);
    setInputMnemonic("");
  }

  return (
    <CustomCard darkTitle={true} headerTitle={<SwitchMode mode={mode} onChangeMode={onChangeMode} />} headerChildren={<SwitchNetwork />}>
      <Stack gap={"10px"}>
        <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
          {"Register Admin Wallet"}
        </Typography>
        <TableWithNoHeader rows={
          <Fragment>
            <CustomRow
              title={"Mnemonic"}
              merge={true}
              rowSpan={1}
              children={<TextInput value={inputMnemonic} checkValue={isValidKey} placeholder={"MNEMONIC"} onChange={onChangeMnemonic} />}
            />
          </Fragment>
        } />
        <Stack alignItems={"flex-end"}>
          <SmallButton title={"REGISTER"} active={active} onClick={onClickMnemonicRegister} />
        </Stack>
        <Fragment>
          <Deploy tab={tab} wallet={wallet} address={address} firmaSDK={firmaSDK} />
        </Fragment>
      </Stack>
    </CustomCard>
  )
}

export default Contract;