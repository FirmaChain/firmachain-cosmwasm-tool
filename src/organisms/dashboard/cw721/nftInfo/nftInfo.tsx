import { Stack, Typography } from "@mui/material";
import SmallButton from "components/button/smallButton";
import TextInput from "components/input/textInput";
import CustomRow from "components/table/row/customRow";
import TableWithNoHeader from "components/table/tableWithNoHeader";
import Toast from "components/toast";
import { useCw721NftInfo } from "hooks/cw721/query";
import useFirmaSDK from "hooks/useFirmaSDK";
import { ICw721NftInfo } from "interfaces/cw721";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "store/reducers";
import ApprovalsInfo from "./approval";
import Address from "components/text/address";

interface IProps {
  walletAddress: string;
}

const Cw721NftInfo = ({ walletAddress }: IProps) => {
  const { firmaSDK } = useFirmaSDK();
  const { Cw721ContractAddress } = useSelector((state: rootState) => state.contract);

  const [nftInfo, setNftInfo] = useState<ICw721NftInfo | null>(null);
  const [searchNftId, setSearchNftId] = useState<string>("");

  const ResetValues = () => {
    setSearchNftId("");
  };

  const { mutate } = useCw721NftInfo(firmaSDK, Cw721ContractAddress, searchNftId, {
    onMutate: () => {

    },
    onSuccess: (data: any) => {
      if (data !== undefined) {
        console.log(data);
        setNftInfo(data.data);
      }
    },
    onError: (error: any) => {
      ResetValues();
      Toast({ message: String(new Error(error.message)), variant: "error" });
    },
    onSettled: () => {

    },
  });

  const onChangeSearchAddress = (value: string) => {
    setSearchNftId(value);
  };

  const onClickSearch = useCallback(async () => {
    try {
      mutate(null);
    } catch (error: any) {
      console.log(error);
      Toast({ message: String(new Error(error.message)), variant: "error" });
    }
  }, [searchNftId]);

  const active = useMemo(() => {
    return Boolean(searchNftId === "");
  }, [searchNftId]);

  return (
    <Stack gap={"10px"}>
      <Typography variant={"body1"} sx={{ fontWeight: "600" }}>
        {"Cw721 NftId Search"}
      </Typography>
      <TableWithNoHeader
        rows={
          <Fragment>
            <CustomRow
              title={"NftId"}
              merge={true}
              children={
                <Stack flexDirection={"row"} gap={"10px"}>
                  <TextInput value={searchNftId === null ? "" : searchNftId} placeholder={"NFT ID"} onChange={onChangeSearchAddress} />
                  <Stack flexDirection={"row"} gap={"10px"} sx={{ width: "250px" }}>
                    <SmallButton active={active} title={"Search"} onClick={onClickSearch} />
                  </Stack>
                </Stack>
              }
            />
            <CustomRow
              title={"Owner"}
              merge={true}
              children={
                <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
                  {nftInfo === null ? 
                    <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                      {"-"}
                    </Typography> : 
                    walletAddress === nftInfo.owner ? 
                      <Address address={nftInfo.owner} tabType={"WALLET"} /> :
                      <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                        {nftInfo.owner}
                      </Typography>
                  }
                </Stack>
              }
            />
            <CustomRow
              title={"Token URI"}
              merge={true}
              children={
                <Stack justifyContent={"flex-start"} sx={{ minWidth: "100px" }}>
                  <Typography variant={"body2"} sx={{ fontSize: "0.7rem", opacity: 0.7 }}>
                    {nftInfo === null ? "-" : nftInfo.tokenUri}
                  </Typography>
                </Stack>
              }
            />
            <ApprovalsInfo approvals={nftInfo === null ? [] : nftInfo.approvals} />
          </Fragment>
        }
      />
    </Stack>
  )
}

export default Cw721NftInfo;