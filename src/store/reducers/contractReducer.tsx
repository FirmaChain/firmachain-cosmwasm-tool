import { createAction, createReducer } from "@reduxjs/toolkit";
import { NETWORK_TYPE } from "constants/common";

export interface IContractStateProps {
  targetNetwork: NETWORK_TYPE;
  targetMnemonic: string;
  Cw20CodeId: string;
  Cw20ContractAddress: string;
  Cw20Decimal: number;
};

export const HANDLE_NETWORK = "HANDLE_NETWORK";
export const HANDLE_MNEMONIC = "HANDLE_MNEMONIC";
export const Cw20_CODE_ID = "Cw20_CODE_ID";
export const Cw20_CONTRACT_ADDRESS = "Cw20_CONTRACT_ADDRESS";
export const Cw20_DECIMAL = "Cw20_DECIMAL";

export const initialState: IContractStateProps = {
  targetNetwork: "MAINNET",
  targetMnemonic: "",
  Cw20CodeId: "",
  Cw20ContractAddress: "",
  Cw20Decimal: 0
};

export const ACTION_CREATORS = {
  HANDLE_NETWORK: createAction<NETWORK_TYPE>(HANDLE_NETWORK),
  HANDLE_MNEMONIC: createAction<string>(HANDLE_MNEMONIC),
  Cw20_CODE_ID: createAction<string>(Cw20_CODE_ID),
  Cw20_CONTRACT_ADDRESS: createAction<string>(Cw20_CONTRACT_ADDRESS),
  Cw20_DECIMAL: createAction<number>(Cw20_DECIMAL)
};

export const ACTIONS = {
  handleNetwork: ACTION_CREATORS.HANDLE_NETWORK,
  handleMnemonic: ACTION_CREATORS.HANDLE_MNEMONIC,
  handleCw20CodeId: ACTION_CREATORS.Cw20_CODE_ID,
  handleCw20ContractAddress: ACTION_CREATORS.Cw20_CONTRACT_ADDRESS,
  handleCw20Decimal: ACTION_CREATORS.Cw20_DECIMAL
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ACTION_CREATORS.HANDLE_NETWORK, (state, { payload }) => {
    state.targetNetwork = payload;
  });

  builder.addCase(ACTION_CREATORS.HANDLE_MNEMONIC, (state, { payload }) => {
    state.targetMnemonic = payload;
  });

  builder.addCase(ACTION_CREATORS.Cw20_CODE_ID, (state, { payload }) => {
    state.Cw20CodeId = payload;
  });
  builder.addCase(ACTION_CREATORS.Cw20_CONTRACT_ADDRESS, (state, { payload }) => {
    state.Cw20ContractAddress = payload;
  });
  builder.addCase(ACTION_CREATORS.Cw20_DECIMAL, (state, { payload }) => {
    state.Cw20Decimal = payload;
  });
});

export default reducer;