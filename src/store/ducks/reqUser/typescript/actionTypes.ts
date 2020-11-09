import { Action } from "redux";
import { LoadingState, ReqUserState } from "./state";

export enum ReqUserActionsType {
  SET_USER_DATA = "reqUser/SET_REQ_USER_DATA",
  FETCH_USER_DATA = "reqUser/FETCH_REQ_USER_DATA",
  SET_LOADING_STATE = "reqUser/SET_REQ_LOADING_STATE",
  SET_IS_SUBSCRIBED = "reqUser/SET_IS_SUBSCRIBED",
  FETCH_IS_SUBSCRIBED = "reqUser/FETCH_IS_SUBSCRIBED",
  SUBSCRIBE = "reqUser/FETCH_SUBSCRIBE",
  UNSUBSCRIBE = "reqUser/FETCH_UNSUBSCRIBE",
}

export interface SetIsSubscribedActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_IS_SUBSCRIBED;
  payload: boolean;
}
export interface FetchIsSubscribedActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.FETCH_IS_SUBSCRIBED;
}

export interface SetReqUserDataActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_USER_DATA;
  payload: ReqUserState["data"];
}
export interface SubscribeActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SUBSCRIBE;
  payload: string;
}
export interface UnsubscribeActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.UNSUBSCRIBE;
  payload: string;
}
export interface DataActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_USER_DATA;
  payload: ReqUserState["data"];
}

export interface FetchReqUserDataActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.FETCH_USER_DATA;
  payload: string;
}

export interface SetReqUserLoadingStateActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
