import { bindActionCreators } from "redux";
import { ThunkAction } from "redux-thunk";

import { store } from ".";
import { ACTIONS as globalActions } from "./reducers/globalReducer";
import { ACTIONS as contractActions } from "./reducers/contractReducer";
import { ACTIONS as modalActions } from "./reducers/modalReducer";

const { dispatch } = store;

declare module "redux" {
  export function bindActionCreators<M extends ActionCreatorsMapObject<any>>(
    actionCreators: M,
    dispatch: Dispatch
  ): {
      [N in keyof M]: ReturnType<M[N]> extends ThunkAction<any, any, any, any> ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>> : M[N];
    };
}

export const GlobalActions = bindActionCreators(globalActions, dispatch);
export const ContractActions = bindActionCreators(contractActions, dispatch);
export const ModalActions = bindActionCreators(modalActions, dispatch);