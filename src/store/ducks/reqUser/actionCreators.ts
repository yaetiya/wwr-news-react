import { News } from "../news/typescript/state";
import {
  FetchIsSubscribedActionInterface,
  FetchReqUserDataActionInterface,
  FetchReqUserPostsActionInterface,
  ReqUserActionsType,
  SetIsSubscribedActionInterface,
  SetPageActionInterface,
  SetReqUserDataActionInterface,
  SetReqUserLoadingStateActionInterface,
  SetReqUserPostsActionInterface,
  SubscribeActionInterface,
  UnsubscribeActionInterface,
} from "./typescript/actionTypes";
import { LoadingState, ReqUserState } from "./typescript/state";
export const setIsSubscribedData = (
  payload: boolean
): SetIsSubscribedActionInterface => ({
  type: ReqUserActionsType.SET_IS_SUBSCRIBED,
  payload,
});
export const fetchIsSubscribedData = (): FetchIsSubscribedActionInterface => ({
  type: ReqUserActionsType.FETCH_IS_SUBSCRIBED,
});
export const setReqUserData = (
  payload: ReqUserState["data"]
): SetReqUserDataActionInterface => ({
  type: ReqUserActionsType.SET_USER_DATA,
  payload,
});

export const setReqUserLoadingState = (
  payload: LoadingState
): SetReqUserLoadingStateActionInterface => ({
  type: ReqUserActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchReqUserData = (
  payload: string
): FetchReqUserDataActionInterface => ({
  type: ReqUserActionsType.FETCH_USER_DATA,
  payload,
});

export const fetchSubscribe = (payload: string): SubscribeActionInterface => ({
  type: ReqUserActionsType.SUBSCRIBE,
  payload,
});

export const SetReqUserPostsData = (
  payload: News[]
): SetReqUserPostsActionInterface => ({
  type: ReqUserActionsType.SET_REQ_USER_POSTS,
  payload,
});
export const SetPageData = (payload: number): SetPageActionInterface => ({
  type: ReqUserActionsType.SET_PAGE,
  payload,
});

export const FetchReqUserPostsData = (): FetchReqUserPostsActionInterface => ({
  type: ReqUserActionsType.FETCH_REQ_USER_POSTS,
});

export const fetchUnsubscribe = (
  payload: string
): UnsubscribeActionInterface => ({
  type: ReqUserActionsType.UNSUBSCRIBE,
  payload,
});

export type ReqUserActions =
  | SetPageActionInterface
  | FetchReqUserPostsActionInterface
  | SetReqUserPostsActionInterface
  | FetchIsSubscribedActionInterface
  | SetIsSubscribedActionInterface
  | SetReqUserDataActionInterface
  | FetchReqUserDataActionInterface
  | SetReqUserLoadingStateActionInterface
  | UnsubscribeActionInterface
  | SubscribeActionInterface;
