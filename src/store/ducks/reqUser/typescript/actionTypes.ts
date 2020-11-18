import { Action } from "redux";
import { News } from "../../news/typescript/state";
import { LoadingState, ReqUserState } from "./state";

export enum ReqUserActionsType {
  SET_USER_DATA = "reqUser/SET_REQ_USER_DATA",
  FETCH_USER_DATA = "reqUser/FETCH_REQ_USER_DATA",
  SET_LOADING_STATE = "reqUser/SET_REQ_LOADING_STATE",
  SET_IS_SUBSCRIBED = "reqUser/SET_IS_SUBSCRIBED",
  FETCH_IS_SUBSCRIBED = "reqUser/FETCH_IS_SUBSCRIBED",
  SET_REQ_USER_POSTS = "reqUser/ADD_REQ_USER_POSTS",
  FETCH_REQ_USER_POSTS = "reqUser/FETCH_REQ_USER_POSTS",
  SUBSCRIBE = "reqUser/FETCH_SUBSCRIBE",
  UNSUBSCRIBE = "reqUser/FETCH_UNSUBSCRIBE",
  SET_PAGE = "reqUser/SET_PAGE"
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

export interface FetchReqUserPostsActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.FETCH_REQ_USER_POSTS;
}
export interface SetReqUserPostsActionInterface
  extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_REQ_USER_POSTS;
  payload: News[];
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
export interface SetPageActionInterface extends Action<ReqUserActionsType> {
  type: ReqUserActionsType.SET_PAGE;
  payload: number;
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
