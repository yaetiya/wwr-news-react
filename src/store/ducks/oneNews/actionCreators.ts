import { TComment } from "../news/typescript/state";
import {
  FetchOneNewsDataActionInterface,
  SetOneNewsDataActionInterface,
  SetOneNewsLoadingStateActionInterface,
  OneNewsActionsType,
  SetErrorMessageDataActionInterface,
  SendCommentDataActionInterface,
  SetCommentOneNewsDataActionInterface,
} from "./typescript/actionTypes";
import { LoadingState, OneNewsState, TPreComment } from "./typescript/state";

export const setOneNewsData = (
  payload: OneNewsState["data"]
): SetOneNewsDataActionInterface => ({
  type: OneNewsActionsType.SET_ONE_NEWS_DATA,
  payload,
});
export const setCommentOneNewsData = (
  payload: TComment
): SetCommentOneNewsDataActionInterface => ({
  type: OneNewsActionsType.SET_COMMENT_ONE_NEWS_DATA,
  payload,
});

export const setOneNewsLoadingState = (
  payload: LoadingState
): SetOneNewsLoadingStateActionInterface => ({
  type: OneNewsActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchOneNewsData = (
  payload: string
): FetchOneNewsDataActionInterface => ({
  type: OneNewsActionsType.FETCH_ONE_NEWS_DATA,
  payload,
});

export const sendCommentOneNewsData = (
  payload: TPreComment
): SendCommentDataActionInterface => ({
  type: OneNewsActionsType.SEND_COMMENT,
  payload,
});

export const setErrorMessageOneNewsData = (
  payload: string
): SetErrorMessageDataActionInterface => ({
  type: OneNewsActionsType.SET_ERROR_MESSAGE,
  payload,
});

export type OneNewsActions =
  | SetOneNewsDataActionInterface
  | SetCommentOneNewsDataActionInterface
  | FetchOneNewsDataActionInterface
  | SetOneNewsLoadingStateActionInterface
  | SetErrorMessageDataActionInterface
  | SendCommentDataActionInterface;
