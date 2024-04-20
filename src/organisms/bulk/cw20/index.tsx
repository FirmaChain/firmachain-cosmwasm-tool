import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import { rootState } from "store/reducers";
import useFirmaSDK from "hooks/useFirmaSDK";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import BurnBulk from "./contents/burnBulk";
import MintBulk from "./contents/mintBulk";
import TransferBulk from "./contents/transferBulk";
import BurnBulkFrom from "./contents/burnFromBulk";
import TransferFromBulk from "./contents/transferFromBulk";
import { DISTRIBUTE_CONTRACT } from "constants/message";

const Cw20Bulk = () => {
  const { firmaSDK, wallet, address } = useFirmaSDK();
  const { Cw20ContractAddress } = useSelector((state: rootState) => state.contract);

  const isAddressEmpty = !Cw20ContractAddress;

  return (
    <div style={{ position: 'relative' }}>
      {isAddressEmpty && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <span style={{ color: 'white', fontSize: '20px' }}>{DISTRIBUTE_CONTRACT}</span>
        </div>
      )}
      <Stack gap={"20px"}>
        <TableWithNoHeader
          rows={
            <Fragment>
              <MintBulk firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
              {/* <BurnBulk firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} /> */}
              <TransferBulk firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
              <TransferFromBulk firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
              <BurnBulkFrom firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            </Fragment>
          }
        />
      </Stack>
    </div>
  )
}

export default Cw20Bulk;