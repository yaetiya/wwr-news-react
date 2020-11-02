import produce, { Draft } from 'immer';
import { LoadingState } from '../news/typescript/state';
import { OneNewsActions } from './actionCreators';
import { OneNewsActionsType } from './typescript/actionTypes';
import { OneNewsState } from './typescript/state';

const initialOneNewsState: OneNewsState = {
  data: undefined,
  loadingState: LoadingState.NEVER,
};

export const oneNewsReducer = produce((draft: Draft<OneNewsState>, action: OneNewsActions) => {
  switch (action.type) {
    case OneNewsActionsType.SET_ONE_NEWS_DATA:
      draft.data = action.payload;
      draft.loadingState = LoadingState.LOADED;
      break;

    case OneNewsActionsType.FETCH_ONE_NEWS_DATA:
      draft.data = undefined;
      draft.loadingState = LoadingState.LOADING;
      break;

    case OneNewsActionsType.SET_LOADING_STATE:
      draft.loadingState = action.payload;
      break;

    default:
      break;
  }
}, initialOneNewsState);
