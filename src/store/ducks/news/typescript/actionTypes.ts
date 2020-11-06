import { Action } from "redux";
import { AddFormState, LoadingState, NewsState, preNews } from "./state";

export enum NewsActionsType {
  SET_NEWS = "news/SET_NEWS",
  SET_NEWS_TO_TOP = "news/SET_NEWS_TO_TOP",
  SET_LEFT_NEWS = "news/SET_LEFT_NEWS",
  FETCH_NEWS = "news/FETCH_NEWS",
  FETCH_LEFT_NEWS = "news/FETCH_LEFT_NEWS",
  SET_LOADING_STATE = "news/SET_LOADING_STATE",
  FETCH_ADD_NEWS = "news/FETCH_ADD_NEWS",
  ADD_NEWS = "news/ADD_NEWS",
  SET_ADD_FORM_STATE = "news/SET_ADD_FORM_STATE",
  FETCH_ADD_TWEET = "news/FETCH_ADD_TWEET",
  SET_ADD_MESSAGE = "news/SET_ADD_MESSAGE",
  SET_FETCHED_NEWS_PAGE = "news/SET_FETCHED_NEWS_PAGE"
}

export interface SetFetchedNewsPageActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.SET_FETCHED_NEWS_PAGE;
  payload: number;
}
export interface SetNewsActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.SET_NEWS;
  payload: NewsState["items"];
}
export interface SetNewsToTopActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.SET_NEWS_TO_TOP;
  payload: NewsState["items"];
}
export interface SetLeftNewsActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.SET_LEFT_NEWS;
  payload: NewsState["leftItems"];
}

export interface FetchAddNewsActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.FETCH_ADD_NEWS;
  payload: preNews;
}

export interface SetAddMessage extends Action<NewsActionsType> {
  type: NewsActionsType.SET_ADD_MESSAGE;
  payload: string;
}

export interface FetchNewsActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.FETCH_NEWS;
}
export interface FetchLeftNewsActionInterface extends Action<NewsActionsType> {
  type: NewsActionsType.FETCH_LEFT_NEWS;
}

export interface SetNewsLoadingStateActionInterface
  extends Action<NewsActionsType> {
  type: NewsActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}

export interface SetAddFormStateActionInterface
  extends Action<NewsActionsType> {
  type: NewsActionsType.SET_ADD_FORM_STATE;
  payload: AddFormState;
}
