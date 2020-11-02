import { RootState } from '../../store';
import { LoadingState } from '../news/typescript/state';
import { OneNewsState } from './typescript/state';

export const selectOneNews = (state: RootState): OneNewsState => state.oneNews;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectOneNews(state).loadingState;

export const selectIsOneNewsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectIsOneNewsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectOneNewsData = (state: RootState): OneNewsState['data'] => selectOneNews(state)?.data;
