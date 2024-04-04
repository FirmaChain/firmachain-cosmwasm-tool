import { combineReducers } from "redux";

import global, { IGlobalStateProps } from "./globalReducer";
import contract, { IContractStateProps } from "./contractReducer";

export interface rootState {
  global: IGlobalStateProps,
  contract: IContractStateProps,
}

const reducers = combineReducers({ global, contract });

export default reducers