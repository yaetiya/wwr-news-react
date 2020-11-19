import { Action } from "redux";
import { TComment } from "../../news/typescript/state";
import { LoadingState, OneNewsState, TPreComment } from "./state";

export enum OneNewsActionsType {
  SET_ONE_NEWS_DATA = "oneNews/SET_ONE_NEWS_DATA",
  SET_COMMENT_ONE_NEWS_DATA = "oneNews/SET_COMMENT_ONE_NEWS_DATA",
  FETCH_ONE_NEWS_DATA = "oneNews/FETCH_ONE_NEWS_DATA",
  SET_LOADING_STATE = "oneNews/SET_LOADING_STATE",
  DELETE_ONE_NEWS = "news/DELETE_ONE_NEWS",
  SEND_COMMENT = "oneNews/SEND/SEND_COMMENT",
  SET_ERROR_MESSAGE = "oneNews/SET/SET_ERROR_MESSAGE",
}

export interface SetOneNewsDataActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_ONE_NEWS_DATA;
  payload: OneNewsState["data"];
}

export interface DeleteOneNewsActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.DELETE_ONE_NEWS;
  payload: string;
}
export interface SetCommentOneNewsDataActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_COMMENT_ONE_NEWS_DATA;
  payload: TComment;
}

export interface FetchOneNewsDataActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.FETCH_ONE_NEWS_DATA;
  payload: string;
}

export interface SetOneNewsLoadingStateActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}

export interface SendCommentDataActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SEND_COMMENT;
  payload: TPreComment;
}
export interface SetErrorMessageDataActionInterface
  extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_ERROR_MESSAGE;
  payload: string;
}
