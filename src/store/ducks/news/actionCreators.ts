import {
  FetchAddNewsActionInterface,
  FetchLeftNewsActionInterface,
  FetchLeftNewsFromTagActionInterface,
  FetchNewsActionInterface,
  NewsActionsType,
  ResetNewsActionInterface,
  SetAddFormStateActionInterface,
  SetAddMessage,
  SetFetchedNewsPageActionInterface,
  SetLeftNewsActionInterface,
  SetNewsActionInterface,
  SetNewsLoadingStateActionInterface,
  SetNewsToTopActionInterface,
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

export const resetNews = (
  payload: NewsState["items"]
): ResetNewsActionInterface => ({
  type: NewsActionsType.RESET_NEWS,
  payload,
});

export const setNewsToTop = (
  payload: NewsState["items"]
): SetNewsToTopActionInterface => ({
  type: NewsActionsType.SET_NEWS_TO_TOP,
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

export const setFetchedNewsPage = (payload: number): SetFetchedNewsPageActionInterface => ({
  type: NewsActionsType.SET_FETCHED_NEWS_PAGE,
  payload
});

export const fetchLeftNewsFromTag = (payload: string):FetchLeftNewsFromTagActionInterface => ({
  type: NewsActionsType.FETCH_LEFT_NEWS_FROM_TAG,
  payload
});

export const fetchLeftNews = (): FetchLeftNewsActionInterface => ({
  type: NewsActionsType.FETCH_LEFT_NEWS,
});


export type NewsActions =
  | SetNewsActionInterface
  | SetNewsToTopActionInterface
  | SetLeftNewsActionInterface
  | FetchNewsActionInterface
  | FetchLeftNewsActionInterface
  | SetNewsLoadingStateActionInterface
  | FetchAddNewsActionInterface
  | SetAddFormStateActionInterface
  | ResetNewsActionInterface
  | SetAddMessage
  | SetFetchedNewsPageActionInterface
  | FetchLeftNewsFromTagActionInterface;
