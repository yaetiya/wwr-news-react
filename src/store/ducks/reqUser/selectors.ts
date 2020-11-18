import { RootState } from "../../store";
import { LoadingState, ReqUserState } from "./typescript/state";

export const selectReqUser = (state: RootState): ReqUserState => state.reqUser;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectReqUser(state).loadingState;

export const selectIsReqUserLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectReqUserData = (state: RootState): ReqUserState["data"] =>
  selectReqUser(state)?.data;
export const selectReqUserUsername = (state: RootState): string | undefined =>
  selectReqUserData(state)?.username;
export const selectIsSubscribed = (state: RootState): boolean | undefined =>
  selectReqUser(state)?.isSubscribed;
export const selectIsReqUserError = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.ERROR;
export const selectReqUserPage = (state: RootState): number | undefined =>
  selectReqUser(state).page;
export const selectIsReqUserLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;
