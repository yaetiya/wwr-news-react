import { RootState } from "../../store";
import { LoadingState, News, TComment } from "../news/typescript/state";
import { OneNewsState } from "./typescript/state";

export const selectOneNews = (state: RootState): OneNewsState => state.oneNews;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectOneNews(state).loadingState;

export const selectIsOneNewsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectIsOneNewsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectOneNewsData = (state: RootState): News | undefined =>
  selectOneNews(state)?.data;

export const selectComments = (state: RootState): TComment[] | undefined =>
  selectOneNewsData(state)?.commentsId;

  export const selectAddCommentErrorMessage = (state: RootState): string | undefined =>
  selectOneNews(state).addCommentErrorMessage;
