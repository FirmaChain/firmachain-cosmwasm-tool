import { Fragment, useMemo, useState } from "react";
import { Stack } from "@mui/material";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import SmallButton from "components/button/smallButton";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import { ContractActions, GlobalActions } from "store/action";
import Toast from "components/toast";
import { RECOVER_COMPLETE } from "constants/message";

const Cw20 = () => {
  const [cw20ContractAddress, setCw20ContractAddress] = useState<string>("");
  
  const onChangeCw20ContractAddress = (value: string) => {
    setCw20ContractAddress(value);
  }

  const active = useMemo(() => {
      return Boolean(cw20ContractAddress === "");
  }, [cw20ContractAddress]);

  const onClickRecover = () => {
    try {
      ContractActions.handleCw20ContractAddress(cw20ContractAddress);
      GlobalActions.handleRefetch("Cw20");
      Toast({ message: `TOKEN ${RECOVER_COMPLETE}`, variant: "success" });
    } catch (error: any) {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  }

  return (
    <Stack gap={"10px"}>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CustomRow title={"Cw20 Contract Address"} merge={true} children={<TextInput value={cw20ContractAddress} placeholder={"CW20 CONTRACT ADDRESS"} onChange={onChangeCw20ContractAddress} />} />
          </Fragment>
        }
      />
      <Stack alignItems={"flex-end"}>
        <SmallButton title={"Recover"} active={active} onClick={onClickRecover} />
      </Stack>
    </Stack>
  )
}

export default Cw20;