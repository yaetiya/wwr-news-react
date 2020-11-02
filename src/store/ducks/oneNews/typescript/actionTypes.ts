import { Action } from 'redux';
import { LoadingState, OneNewsState } from './state';

export enum OneNewsActionsType {
  SET_ONE_NEWS_DATA = 'tweet/SET_ONE_NEWS_DATA',
  FETCH_ONE_NEWS_DATA = 'tweet/FETCH_ONE_NEWS_DATA',
  SET_LOADING_STATE = 'tweet/SET_LOADING_STATE',
}

export interface SetOneNewsDataActionInterface extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_ONE_NEWS_DATA;
  payload: OneNewsState['data'];
}

export interface FetchOneNewsDataActionInterface extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.FETCH_ONE_NEWS_DATA;
  payload: string;
}

export interface SetOneNewsLoadingStateActionInterface extends Action<OneNewsActionsType> {
  type: OneNewsActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
