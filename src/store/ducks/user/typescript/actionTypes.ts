import { Action } from "redux";
import {
  ChangeAvatarState,
  LoadingState,
  RegistrationState,
  SignUpData,
  UserLoadingData,
  UserState,
} from "./state";

export enum UserActionsType {
  SET_USER_DATA = "user/LOAD/SET_USER_DATA",
  FETCH_USER_DATA = "user/LOAD/FETCH_USER_DATA",
  FETCH_USER_JWT_DATA = "user/LOAD/FETCH_USER_JWT_DATA",
  SIGN_UP = "user/SEND/SIGN_UP",
  LOAD_JWT_DATA = "user/LOAD/LOAD_JWT_DATA",
  SET_ONLY_JWT = "user/SET_ONLY_JWT",
  SET_LOADING_STATE = "user/LOAD/SET_LOADING_STATE",
  LOGOUT = "user/LOAD/LOGOUT",
  CHANGE_FETCHED_USER_AVATAR = "user/CHANGE_FETCHED_USER_AVATAR",
  CHANGE_FETCHED_USER_HEADER = "user/CHANGE_FETCHED_USER_HEADER",
  SET_REGISTRATION_STATE = "user/LOAD/SET_REGISTRATION_STATE",
  SET_CHANGE_AVATAR_STATE = "user/SET_CHANGE_AVATAR_STATE",
  SET_ERROR_MESSAGE = "user/SET_ERROR_MESSAGE",
  SET_ERROR_REGISTRATION_FIELD = "user/SET_ERROR_REGISTRATION_FIELD",
  CHANGE_AVATAR = "user/CHANGE_AVATAR",
  CHANGE_HEADER = "user/CHANGE_HEADER",
}
export interface ChangeAvatarActionInterface extends Action<UserActionsType> {
  type: UserActionsType.CHANGE_AVATAR;
  payload: string;
}
export interface ChangeHeaderActionInterface extends Action<UserActionsType> {
  type: UserActionsType.CHANGE_HEADER;
  payload: string;
}
export interface ChangeFetchedUserAvatarActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.CHANGE_FETCHED_USER_AVATAR;
  payload: string;
}
export interface ChangeFetchedUserHeaderActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.CHANGE_FETCHED_USER_HEADER;
  payload: string;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_DATA;
  payload: UserState["data"];
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
  payload: UserLoadingData;
}
export interface SetOnlyJWTActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_ONLY_JWT;
  payload: string | undefined;
}
export interface SetErrorMessageActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_ERROR_MESSAGE;
  payload: string;
}
export interface SetErrorRegistrationFieldActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_ERROR_REGISTRATION_FIELD;
  payload: string | undefined;
}
export interface SignUpDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SIGN_UP;
  payload: SignUpData;
}
export interface FetchUserJWTDataActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_JWT_DATA;
  payload: string;
}
export interface LoadJWTDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.LOAD_JWT_DATA;
}
export interface LogoutActionInterface extends Action<UserActionsType> {
  type: UserActionsType.LOGOUT;
}

export interface SetUserLoadingStateActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}
export interface SetUserChangeAvatarStateActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_CHANGE_AVATAR_STATE;
  payload: ChangeAvatarState;
}

export interface SetUserRegistrationStateActionInterface
  extends Action<UserActionsType> {
  type: UserActionsType.SET_REGISTRATION_STATE;
  payload: RegistrationState;
}
