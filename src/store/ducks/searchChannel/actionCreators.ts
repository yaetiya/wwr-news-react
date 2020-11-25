import {
  FetchChennelsActionInterface,
  SearchChannelActionsType,
  SetChennelsActionInterface,
  SetLoadingStateActionInterface,
} from "./typescript/actionTypes";
import { Channel, SearchLoadingState } from "./typescript/state";

export const setChannels = (
  payload: Channel[]
): SetChennelsActionInterface => ({
  type: SearchChannelActionsType.SET_CHANNELS,
  payload,
});
export const setLoadingState = (
  payload: SearchLoadingState
): SetLoadingStateActionInterface => ({
  type: SearchChannelActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchChannels = (
  payload: string
): FetchChennelsActionInterface => ({
  type: SearchChannelActionsType.FETCH_CHANNELS,
  payload,
});
export type SearchChannelActions =
  | SetChennelsActionInterface
  | SetLoadingStateActionInterface
  | FetchChennelsActionInterface;
