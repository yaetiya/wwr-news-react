import { createSelector } from "reselect";
import { RootState } from "../../store";
import { AddFormState, LoadingState, NewsState } from "./typescript/state";

export const selectNews = (state: RootState): NewsState => state.news;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectNews(state).loadingState;
export const selectAddPostState = (state: RootState): AddFormState =>
  selectNews(state).addFormState;

export const selectAddFormState = (state: RootState): AddFormState =>
  selectNews(state).addFormState;

export const selectIsNewsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectIsNewsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectNewsItems = createSelector(selectNews, (news) => news.items);
export const selectAddMessage = createSelector(
  selectNews,
  (news) => news.addNewsMessage
);
export const selectIsAddPostLoaded = (state: RootState): boolean =>
  selectAddFormState(state) === AddFormState.LOADED;
export const selectLeftNewsItems = createSelector(
  selectNews,
  (news) => news.leftItems
);
export const selectIsNewPostLoading = (state: RootState): boolean => 
selectAddFormState(state) === AddFormState.LOADING;

export const selectFetchedNewsPage = (state: RootState): number =>
  selectNews(state).fetchedNewsPage;

export const selectLeftNewsPage = (state: RootState): number =>
  selectNews(state).leftNewsPage;
