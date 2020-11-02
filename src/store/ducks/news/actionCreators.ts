import {
  FetchAddNewsActionInterface,
  FetchLeftNewsActionInterface,
  FetchNewsActionInterface,
  NewsActionsType,
  SetAddFormStateActionInterface,
  SetAddMessage,
  SetLeftNewsActionInterface,
  SetNewsActionInterface,
  SetNewsLoadingStateActionInterface,
} from "./typescript/actionTypes";
import {
  AddFormState,
  LoadingState,
  NewsState,
  preNews,
} from "./typescript/state";

export const setNews = (
  payload: NewsState["items"]
): SetNewsActionInterface => ({
  type: NewsActionsType.SET_NEWS,
  payload,
});
export const setLeftNews = (
  payload: NewsState["leftItems"]
): SetLeftNewsActionInterface => ({
  type: NewsActionsType.SET_LEFT_NEWS,
  payload,
});

export const fetchAddNews = (payload: preNews): FetchAddNewsActionInterface => ({
  type: NewsActionsType.FETCH_ADD_NEWS,
  payload,
});

export const setNewsLoadingState = (
  payload: LoadingState
): SetNewsLoadingStateActionInterface => ({
  type: NewsActionsType.SET_LOADING_STATE,
  payload,
});

export const setAddMessage = (
  payload: string
): SetAddMessage => ({
  type: NewsActionsType.SET_ADD_MESSAGE,
  payload,
});


export const setAddFormState = (
  payload: AddFormState
): SetAddFormStateActionInterface => ({
  type: NewsActionsType.SET_ADD_FORM_STATE,
  payload,
});

export const fetchNews = (): FetchNewsActionInterface => ({
  type: NewsActionsType.FETCH_NEWS,
});

export const fetchLeftNews = (): FetchLeftNewsActionInterface => ({
  type: NewsActionsType.FETCH_LEFT_NEWS,
});


export type NewsActions =
  | SetNewsActionInterface
  | SetLeftNewsActionInterface
  | FetchNewsActionInterface
  | FetchLeftNewsActionInterface
  | SetNewsLoadingStateActionInterface
  | FetchAddNewsActionInterface
  | SetAddFormStateActionInterface
  | SetAddMessage;
