import { RootState } from "../../store";
import { News, TComment } from "../news/typescript/state";
import { LoadingState, OneNewsState } from "./typescript/state";

export const selectOneNews = (state: RootState): OneNewsState => state.oneNews;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectOneNews(state).loadingState;

export const selectIsOneNewsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectIsOneNewsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;
export const selectIsOneNewsError = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.ERROR;

export const selectOneNewsData = (state: RootState): News | undefined =>
  selectOneNews(state)?.data;
export const selectIsOneNewsDeleted = (state: RootState): boolean | undefined =>
  selectLoadingState(state) === LoadingState.DELETED;
export const selectIsOneNewsNotDeleted = (
  state: RootState
): boolean | undefined =>
  selectLoadingState(state) === LoadingState.NOT_DELETED;
export const selectComments = (state: RootState): TComment[] | undefined =>
  selectOneNewsData(state)?.commentsId;
export const selectAddCommentErrorMessage = (
  state: RootState
): string | undefined => selectOneNews(state).addCommentErrorMessage;
