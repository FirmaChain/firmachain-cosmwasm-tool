import { Fragment, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { FirmaUtil } from "@firmachain/firma-js";

import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import Toast from "components/toast";

import { rootState } from "store/reducers";
import useFirmaSDK from "hooks/useFirmaSDK";
import { useCw20AddressInfo } from "hooks/cw20/query";

import { ICw20AddressInfo } from "interfaces/cw20";

import { formatNumberWithComma } from "utils/number";

import AllowanceInfo from "./allowanceInfo";

const Cw20AddressInfo = () => {
  const { firmaSDK } = useFirmaSDK();
  const { Cw20ContractAddress, Cw20Decimal } = useSelector((state: rootState) => state.contract);

  const [addressInfo, setAddressInfo] = useState<ICw20AddressInfo | null>(null);
  const [searchAddress, setSearchAddress] = useState<string>("");

  const ResetValues = () => {
    setAddressInfo(null);
  };

  const { mutate } = useCw20AddressInfo(firmaSDK, Cw20ContractAddress, searchAddress, {
    onMutate: () => {

    },
    onSuccess: (data: any) => {
      if (data !== undefined) {
        setAddressInfo(data.data);
      }
    },
    onError: (error: any) => {
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {
      
    },
  });

  const onChangeSearchAddress = (value: string) => {
    setSearchAddress(value);
  };

  const onClickSearch = useCallback(async () => {
    try {
      ResetValues();
      mutate(null);
    } catch (error: any) {
      console.log(error);
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  }, [searchAddress]);

  const checkSearchAddress = useMemo(() => {
    return searchAddress === "" ? true : FirmaUtil.isValidAddress(searchAddress);
  }, [searchAddress]);

  const active = useMemo(() => {
    return Boolean(searchAddress === "" || checkSearchAddress === false);
  }, [searchAddress, checkSearchAddress]);

  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"Cw20 Address Search"}
      </Typography>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CustomRow
              title={"Address"}
              merge={true}
              children={
                <Stack flexDirection={"row"} gap={"10px"}>
                  <TextInput value={searchAddress === null ? "" : searchAddress} checkValue={checkSearchAddress} placeholder={"ADDR"} onChange={onChangeSearchAddress} />
                  <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                    <SmallButton active={active} title={"Search"} onClick={onClickSearch} />
                  </Stack>
                </Stack>
              }
            />
            <CustomRow
              title={"Balance"}
              merge={true}
              children={
                <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
                  <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                    {addressInfo === null ? "-" : formatNumberWithComma(addressInfo.balance, Cw20Decimal)}
                  </Typography>
                </Stack>}
            />
            <AllowanceInfo allowances={addressInfo === null ? [] : addressInfo.allAllowances} />
            <CustomRow
              title={"Spenders"}
              merge={true}
              children={
                <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
                  <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                    {addressInfo === null ? "-" : JSON.stringify(addressInfo.allSpenderAllowances)}
                  </Typography>
                </Stack>}
            />
            {/* <SpenderInfos spenders={addressInfo === null ? [] : addressInfo.allSpenderAllowances} /> */}
          </Fragment>
        }
      />
    </Stack>
  );
}

export default Cw20AddressInfo;