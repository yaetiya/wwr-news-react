import { RootState } from "../../store";
import { LoadingState, ReqUserState } from "./typescript/state";

export const selectReqUser = (state: RootState): ReqUserState => state.reqUser;

export const selectLoadingState = (state: RootState): LoadingState =>
selectReqUser(state).loadingState;

export const selectIsReqUserLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectReqUserData = (state: RootState): ReqUserState["data"] =>
  selectReqUser(state)?.data;

export const selectIsReqUserError = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.ERROR;

export const selectIsReqUserLoading = (state: RootState): boolean =>
selectLoadingState(state) === LoadingState.LOADING;