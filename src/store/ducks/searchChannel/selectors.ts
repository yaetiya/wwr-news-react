import { RootState } from "../../store";
import {
  Channel,
  SearchChannelState,
  SearchLoadingState,
} from "./typescript/state";

export const selectSearchState = (state: RootState): SearchChannelState =>
  state.searchChannels;

export const selectLoadingState = (state: RootState): SearchLoadingState =>
  selectSearchState(state).loadingState;

export const selectChannels = (state: RootState): Channel[] =>
  selectSearchState(state).items;

export const selectIsChannelsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === SearchLoadingState.LOADING;

export const selectIsChannelsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === SearchLoadingState.LOADED;
