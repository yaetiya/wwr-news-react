import {
  FetchOneNewsDataActionInterface,
  SetOneNewsDataActionInterface,
  SetOneNewsLoadingStateActionInterface,
  OneNewsActionsType,
} from './typescript/actionTypes';
import { LoadingState, OneNewsState } from './typescript/state';

export const setOneNewsData = (payload: OneNewsState['data']): SetOneNewsDataActionInterface => ({
  type: OneNewsActionsType.SET_ONE_NEWS_DATA,
  payload,
});

export const setOneNewsLoadingState = (
  payload: LoadingState,
): SetOneNewsLoadingStateActionInterface => ({
  type: OneNewsActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchOneNewsData = (payload: string): FetchOneNewsDataActionInterface => ({
  type: OneNewsActionsType.FETCH_ONE_NEWS_DATA,
  payload,
});

export type OneNewsActions =
  | SetOneNewsDataActionInterface
  | FetchOneNewsDataActionInterface
  | SetOneNewsLoadingStateActionInterface;
