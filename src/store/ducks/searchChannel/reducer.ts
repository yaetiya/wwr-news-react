import produce, { Draft } from "immer";
import { SearchChannelActions } from "./actionCreators";
import { SearchChannelActionsType } from "./typescript/actionTypes";
import { SearchChannelState, SearchLoadingState } from "./typescript/state";

const initialNewsState: SearchChannelState = {
  items: [],
  loadingState: SearchLoadingState.NEVER,
};

export const searchChannelReducer = produce(
  (draft: Draft<SearchChannelState>, action: SearchChannelActions) => {
    switch (action.type) {
      case SearchChannelActionsType.SET_CHANNELS:
        draft.items = action.payload;
        break;
      case SearchChannelActionsType.SET_LOADING_STATE:
        draft.loadingState = SearchLoadingState.LOADED;
        break;
      case SearchChannelActionsType.FETCH_CHANNELS:
        draft.loadingState = SearchLoadingState.LOADING;
        break;
      default:
        break;
    }
  },
  initialNewsState
);
