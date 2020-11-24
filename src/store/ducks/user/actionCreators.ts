import {
  ChangeAvatarActionInterface,
  FetchUserDataActionInterface,
  FetchUserJWTDataActionInterface,
  LoadJWTDataActionInterface,
  LogoutActionInterface,
  SetErrorMessageActionInterface,
  SetErrorRegistrationFieldActionInterface,
  SetOnlyJWTActionInterface,
  SetUserChangeAvatarStateActionInterface,
  SetUserDataActionInterface,
  SetUserLoadingStateActionInterface,
  SetUserRegistrationStateActionInterface,
  SignUpDataActionInterface,
  UserActionsType,
} from "./typescript/actionTypes";
import {
  ChangeAvatarState,
  LoadingState,
  RegistrationState,
  SignUpData,
  UserLoadingData,
  UserState,
} from "./typescript/state";

export const setUserData = (
  payload: UserState["data"]
): SetUserDataActionInterface => ({
  type: UserActionsType.SET_USER_DATA,
  payload,
});

export const setErrorMessageData = (
  payload: string
): SetErrorMessageActionInterface => ({
  type: UserActionsType.SET_ERROR_MESSAGE,
  payload,
});

export const setOnlyJWTData = (
  payload: string | undefined
): SetOnlyJWTActionInterface => ({
  type: UserActionsType.SET_ONLY_JWT,
  payload,
});

export const setErrorRegistrationFieldData = (
  payload: string | undefined
): SetErrorRegistrationFieldActionInterface => ({
  type: UserActionsType.SET_ERROR_REGISTRATION_FIELD,
  payload,
});

export const changeUserAvatar = (
  payload: string
): ChangeAvatarActionInterface => ({
  type: UserActionsType.CHANGE_AVATAR,
  payload,
});

export const setUserLoadingState = (
  payload: LoadingState
): SetUserLoadingStateActionInterface => ({
  type: UserActionsType.SET_LOADING_STATE,
  payload,
});

export const setChangeAvatarState = (
  payload: ChangeAvatarState
): SetUserChangeAvatarStateActionInterface => ({
  type: UserActionsType.SET_CHANGE_AVATAR_STATE,
  payload,
});

export const setUserRegistrationState = (
  payload: RegistrationState
): SetUserRegistrationStateActionInterface => ({
  type: UserActionsType.SET_REGISTRATION_STATE,
  payload,
});

export const fetchUserData = (
  payload: UserLoadingData
): FetchUserDataActionInterface => ({
  type: UserActionsType.FETCH_USER_DATA,
  payload,
});

export const createUser = (payload: SignUpData): SignUpDataActionInterface => ({
  type: UserActionsType.SIGN_UP,
  payload,
});

export const loadUserJWTData = (): LoadJWTDataActionInterface => ({
  type: UserActionsType.LOAD_JWT_DATA,
});

export const logoutUser = (): LogoutActionInterface => ({
  type: UserActionsType.LOGOUT,
});

export const fetchUserJWTData = (
  payload: string
): FetchUserJWTDataActionInterface => ({
  type: UserActionsType.FETCH_USER_JWT_DATA,
  payload,
});

export type UserActions =
  | SetOnlyJWTActionInterface
  | SetUserDataActionInterface
  | FetchUserDataActionInterface
  | SetUserLoadingStateActionInterface
  | SetUserRegistrationStateActionInterface
  | FetchUserJWTDataActionInterface
  | LoadJWTDataActionInterface
  | LogoutActionInterface
  | ChangeAvatarActionInterface
  | SignUpDataActionInterface
  | SetErrorMessageActionInterface
  | SetUserChangeAvatarStateActionInterface
  | SetErrorRegistrationFieldActionInterface;
