import { Fragment, useEffect, useMemo, useState } from "react";
import { FirmaSDK, FirmaWalletService } from "@firmachain/firma-js"
import { Stack, Typography } from "@mui/material";

import SmallButton from "components/button/smallButton";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import CompFile from "./compFile";
import AccessType from "./accessType";
import { STORE_CODE_LOADING } from "constants/message";

export enum ACCESS_TYPES {
  /** ACCESS_TYPE_UNSPECIFIED - AccessTypeUnspecified placeholder for empty value */
  ACCESS_TYPE_UNSPECIFIED = 0,
  /** ACCESS_TYPE_NOBODY - AccessTypeNobody forbidden */
  ACCESS_TYPE_NOBODY = 1,
  /** ACCESS_TYPE_ONLY_ADDRESS - AccessTypeOnlyAddress restricted to an address */
  ACCESS_TYPE_ONLY_ADDRESS = 2,
  /** ACCESS_TYPE_EVERYBODY - AccessTypeEverybody unrestricted */
  ACCESS_TYPE_EVERYBODY = 3,
  UNRECOGNIZED = -1
}

interface IProps {
  firmaSDK: FirmaSDK;
  wallet: FirmaWalletService;
}

const StoreCode = ({ firmaSDK, wallet }: IProps) => {
  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [bufferArray, setBufferArray] = useState<Uint8Array | null>(null);
  const [selectedAccessType, setSelectedAccessType] = useState<number>(ACCESS_TYPES.ACCESS_TYPE_UNSPECIFIED);

  useEffect(() => {
    if (file !== null) {
      const wasmArray = new Uint8Array(file as ArrayBuffer);
      setBufferArray(wasmArray);
    }
  }, [file]);

  const active = useMemo(() => {
    return Boolean(file === null || bufferArray === null);
  }, [bufferArray, file]);

  const handleAccessTypeChange = (value: number) => {
    setSelectedAccessType(value);
  };

  const handleFile = (value: string | ArrayBuffer | null) => {
    setFile(value);
  };

  const onClickStoreCode = () => {
  }

  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"StoreCode"}
      </Typography>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CompFile handleFile={handleFile} />
            <AccessType title={"AccessType"} selectedAccessType={selectedAccessType} onChangeRadioType={handleAccessTypeChange} />
          </Fragment>
        }
      />
      <Stack alignItems={"flex-end"}>
        <SmallButton title={"StoreCode"} active={active} onClick={onClickStoreCode} />
      </Stack>
    </Stack>
  )
}

export default StoreCode;