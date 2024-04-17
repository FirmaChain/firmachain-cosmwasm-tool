import { queryKeysFactory } from "utils/queryKeysFactory";

export interface IKeyValue {
  [key: string]: any;
}

export const QUERY_KEYS = {
  cw20Info: queryKeysFactory("Cw20_INFO"),
  cw721Info: queryKeysFactory("Cw721_INFO")
};
