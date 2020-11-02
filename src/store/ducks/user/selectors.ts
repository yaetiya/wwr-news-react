import { RootState } from "../../store";
import { News } from "../news/typescript/state";
import { LoadingState } from "../user/typescript/state";
import { RegistrationState, UserState } from "./typescript/state";

export const selectUser = (state: RootState): UserState => state.user;

export const selectLoadingState = (state: RootState): LoadingState =>
  selectUser(state).loadingState;

export const selectRegistrationState = (state: RootState): RegistrationState =>
  selectUser(state).registrationState;

export const selectIsUserLoading = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADING;

export const selectIsUserLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.LOADED;

export const selectErrorMessage = (state: RootState): string | undefined =>
  selectUser(state).errorMessage;
export const selectErrorRegistrationField = (
  state: RootState
): string | undefined => selectUser(state).invalidRegistrationField;

export const selectUserData = (state: RootState): UserState["data"] =>
  selectUser(state)?.data;
export const selectUsernameData = (state: RootState): string | undefined =>
  selectUser(state)?.data?.username;
export const selectUserNews = (state: RootState): News[] | undefined =>
selectUser(state)?.data?.articles;
export const selectIsRegistrationSuccess = (state: RootState): boolean =>
  selectRegistrationState(state) === RegistrationState.SUCCESS;
export const selectIsRegistrationError = (state: RootState): boolean =>
  selectRegistrationState(state) === RegistrationState.ERROR;
export const selectIsUserError = (state: RootState): boolean =>
  selectLoadingState(state) === LoadingState.ERROR;

export const selectJWT = (state: RootState): string | undefined =>
  selectUser(state).data?.token;
