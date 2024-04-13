import { Fragment } from "react";
import { useSelector } from "react-redux";

import TableWithNoHeader from "components/table/tableWithNoHeader";
import IncreaseAllowance from "./contents/increaseAllowance";
import DecreaseAllowance from "./contents/decreaseAllowance";
import Transfer from "./contents/transfer";
import TransferFrom from "./contents/transferFrom";
import Send from "./contents/send";
import SendFrom from "./contents/sendFrom";
import Burn from "./contents/burn";
import BurnFrom from "./contents/burnFrom";
import Mint from "./contents/mint";
import UpdateMinter from "./contents/updateMinter";
import UpdateMarketing from "./contents/updateMarketing";
import UpdateLogo from "./contents/updateLogo";

import { rootState } from "store/reducers";
import useFirmaSDK from "hooks/useFirmaSDK";

import { DISTRIBUTE_CONTRACT } from "constants/message";

const Cw20Feature = () => {
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
      <TableWithNoHeader
        rows={
          <Fragment>
            <IncreaseAllowance firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <DecreaseAllowance firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <Transfer firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <TransferFrom firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <Burn firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <BurnFrom firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <Mint firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <UpdateMinter firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <UpdateMarketing firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <UpdateLogo firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            {/* <Send firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} />
            <SendFrom firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw20ContractAddress} /> */}
          </Fragment>
        }
      />
    </div>
  )
};

export default Cw20Feature;