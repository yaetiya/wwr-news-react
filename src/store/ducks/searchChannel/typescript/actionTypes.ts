import { Action } from "redux";
import { Channel, SearchLoadingState } from "./state";

export enum SearchChannelActionsType {
  SET_CHANNELS = "CHANNELS/SET_CHANNELS",
  FETCH_CHANNELS = "CHANNELS/FETCH_CHANNELS",
  SET_LOADING_STATE = "CHANNELS/SET_LOADING_STATE",
}

export interface SetLoadingStateActionInterface
  extends Action<SearchChannelActionsType> {
  type: SearchChannelActionsType.SET_LOADING_STATE;
  payload: SearchLoadingState;
}

export interface SetChennelsActionInterface
  extends Action<SearchChannelActionsType> {
  type: SearchChannelActionsType.SET_CHANNELS;
  payload: Channel[];
}

export interface FetchChennelsActionInterface
  extends Action<SearchChannelActionsType> {
  type: SearchChannelActionsType.FETCH_CHANNELS;
  payload: string;
}
