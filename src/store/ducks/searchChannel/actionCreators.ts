import {
  FetchChannelsActionInterface,
  SearchChannelActionsType,
  SetChannelsActionInterface,
  SetLoadingStateActionInterface,
} from "./typescript/actionTypes";
import { Channel, SearchLoadingState } from "./typescript/state";

export const setChannels = (
  payload: Channel[]
): SetChannelsActionInterface => ({
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
): FetchChannelsActionInterface => ({
  type: SearchChannelActionsType.FETCH_CHANNELS,
  payload,
});
export type SearchChannelActions =
  | SetChannelsActionInterface
  | SetLoadingStateActionInterface
  | FetchChannelsActionInterface;
