import { Fragment } from "react";
import { useSelector } from "react-redux";

import useFirmaSDK from "hooks/useFirmaSDK";
import { rootState } from "store/reducers";
import TableWithNoHeader from "components/table/tableWithNoHeader";

import Mint from "./contents/mint";
import Burn from "./contents/burn";
import Transfer from "./contents/transfer";
import Approve from "./contents/approve";
import Revoke from "./contents/revoke";
import ApproveAll from "./contents/approveAll";
import RevokeAll from "./contents/revokeAll";
import UpdateOwnerShipTransfer from "./contents/updateOwnerShipTransfer";
import UpdateOwnerShipAccept from "./contents/updateOwnerShipAccept";
import UpdateOwnerShipRenounce from "./contents/updateOwnerShipRenounce";
import SendNft from "./contents/sendNft";
import { DISTRIBUTE_CONTRACT } from "constants/message";

const Cw721Feature = () => {
  const { firmaSDK, wallet, address } = useFirmaSDK();
  const { Cw721ContractAddress } = useSelector((state: rootState) => state.contract);

  const isAddressEmpty = !Cw721ContractAddress;

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
            <Mint firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <Burn firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <Transfer firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <Approve firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <Revoke firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <ApproveAll firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <RevokeAll firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <UpdateOwnerShipTransfer firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <UpdateOwnerShipAccept firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <UpdateOwnerShipRenounce firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
            <SendNft firmaSDK={firmaSDK} wallet={wallet} address={address} contractAddress={Cw721ContractAddress} />
          </Fragment>
        }
      />
    </div>
  )
};

export default Cw721Feature;