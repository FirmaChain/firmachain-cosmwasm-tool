import { createAction, createReducer } from "@reduxjs/toolkit";

import { TAB_TYPE } from "constants/common";

export interface IGlobalStateProps {
  tab: TAB_TYPE;
  refetchData: TAB_TYPE | null;
}

export const HANDLE_TAB = "HANDLE_TAB";
export const HANDLE_REFETCH = "HANDLE_REFETCH";

export const initialState: IGlobalStateProps = {
  tab: "Cw20",
  refetchData: null,
}

export const ACTION_CREATORS = {
  HANDLE_TAB: createAction<TAB_TYPE>(HANDLE_TAB),
  HANDLE_REFETCH: createAction<TAB_TYPE | null>(HANDLE_REFETCH)
}

export const ACTIONS = {
  handleTab: ACTION_CREATORS.HANDLE_TAB,
  handleRefetch: ACTION_CREATORS.HANDLE_REFETCH
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ACTION_CREATORS.HANDLE_TAB, (state, { payload }) => {
    state.tab = payload;
  });
  
  builder.addCase(ACTION_CREATORS.HANDLE_REFETCH, (state, { payload }) => {
    state.refetchData = payload;
  });
});

export default reducer;