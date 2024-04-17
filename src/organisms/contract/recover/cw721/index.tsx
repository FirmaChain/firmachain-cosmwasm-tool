import { Fragment, useMemo, useState } from "react";
import { Stack } from "@mui/material";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import SmallButton from "components/button/smallButton";
import CustomRow from "components/table/row/customRow";
import TextInput from "components/input/textInput";
import { ContractActions, GlobalActions } from "store/action";
import Toast from "components/toast";
import { RECOVER_COMPLETE } from "constants/message";

const Cw721 = () => {
  const [cw721ContractAddress, setCw721ContractAddress] = useState<string>("");

  const onChangeCw721ContractAddress = (value: string) => {
    setCw721ContractAddress(value);
  }

  const active = useMemo(() => {
      return Boolean(cw721ContractAddress === "");
  }, [cw721ContractAddress]);

  const onClickRecover = () => {
    try {
      ContractActions.handleCw721ContractAddress(cw721ContractAddress);
      GlobalActions.handleRefetch("Cw721");
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
            <CustomRow title={"Cw721 Contract Address"} merge={true} children={<TextInput value={cw721ContractAddress} placeholder={"CW721 CONTRACT ADDRESS"} onChange={onChangeCw721ContractAddress} />} />
          </Fragment>
        }
      />
      <Stack alignItems={"flex-end"}>
        <SmallButton title={"Recover"} active={active} onClick={onClickRecover} />
      </Stack>
    </Stack>
  )
}

export default Cw721;