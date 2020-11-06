import { FetchReqUserDataActionInterface, ReqUserActionsType, SetReqUserDataActionInterface, SetReqUserLoadingStateActionInterface } from "./typescript/actionTypes";
import { LoadingState, ReqUserState } from "./typescript/state";

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


export type ReqUserActions =
  | SetReqUserDataActionInterface
  | FetchReqUserDataActionInterface
  | SetReqUserLoadingStateActionInterface
;