import { createAction, createReducer } from "@reduxjs/toolkit";
import { ILoadingState, ISnackbarState } from "intefaces/modal";


export interface IModalStateProps {
  loading: ILoadingState;
  snackbar: ISnackbarState;
}

export const HANDLE_LOADING = "HANDLE_LOADING";
export const HANDLE_SNACKBAR = "HANDLE_SNACKBAR";

export const initialState: IModalStateProps = {
  loading: {
    enable: false,
    message: ""
  },
  snackbar: {
    enable: false,
    message: "",
    type: "success"
  },
};

export const ACTION_CREATORS = {
  HANDLE_LOADING: createAction<ILoadingState>(HANDLE_LOADING),
  HANDLE_SNACKBAR: createAction<ISnackbarState>(HANDLE_SNACKBAR),
};

export const ACTIONS = {
  handleLoading: ACTION_CREATORS.HANDLE_LOADING,
  handleSnackbar: ACTION_CREATORS.HANDLE_SNACKBAR,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(ACTION_CREATORS.HANDLE_LOADING, (state, { payload }) => {
    state.loading = payload;
  });

  builder.addCase(ACTION_CREATORS.HANDLE_SNACKBAR, (state, { payload }) => {
    state.snackbar = payload;
  });
});

export default reducer;