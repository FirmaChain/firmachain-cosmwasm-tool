import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

import { rootState } from "store/reducers";
import useFirmaSDK from "hooks/useFirmaSDK";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import MintBulk from "./contents/mintBulk";
import BurnBulk from "./contents/burnBulk";
import TransferBulk from "./contents/transferBulk";
import { DISTRIBUTE_CONTRACT } from "constants/message";

const Cw721Bulk = () => {
  const { firmaSDK, wallet } = useFirmaSDK();
  const { Cw721ContractAddress } = useSelector((state: rootState) => state.contract);

  const isAddressEmpty = !Cw721ContractAddress;

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
              <MintBulk firmaSDK={firmaSDK} wallet={wallet} contractAddress={Cw721ContractAddress} />
              <BurnBulk firmaSDK={firmaSDK} wallet={wallet} contractAddress={Cw721ContractAddress} />
              <TransferBulk firmaSDK={firmaSDK} wallet={wallet} contractAddress={Cw721ContractAddress} />
            </Fragment>
          }
        />
      </Stack>
    </div>
  )
}

export default Cw721Bulk;