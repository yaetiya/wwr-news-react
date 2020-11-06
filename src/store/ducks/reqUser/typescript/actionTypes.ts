import { Action } from "redux";
import { LoadingState, ReqUserState } from "./state";

export enum ReqUserActionsType {
  SET_USER_DATA = "LOAD/SET_REQ_USER_DATA",
  FETCH_USER_DATA = "LOAD/FETCH_REQ_USER_DATA",
  SET_LOADING_STATE = "LOAD/SET_REQ_LOADING_STATE",
}

export interface SetReqUserDataActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_USER_DATA;
  payload: ReqUserState["data"];
}

export interface FetchReqUserDataActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.FETCH_USER_DATA;
  payload: string;
}

export interface SetReqUserLoadingStateActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
