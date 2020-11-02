import { Action } from 'redux';
import { LoadingState, RegistrationState, SignUpData, UserLoadingData, UserState } from './state';

export enum UserActionsType {
  SET_USER_DATA = 'LOAD/SET_USER_DATA',
  FETCH_USER_DATA = 'LOAD/FETCH_USER_DATA',
  FETCH_USER_JWT_DATA = 'LOAD/FETCH_USER_JWT_DATA',
  SIGN_UP = 'SEND/SIGN_UP',
  LOAD_JWT_DATA = 'LOAD/LOAD_JWT_DATA',
  SET_LOADING_STATE = 'LOAD/SET_LOADING_STATE',
  LOGOUT = 'LOAD/LOGOUT',
  SET_REGISTRATION_STATE = 'LOAD/SET_REGISTRATION_STATE',
  SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE',
  SET_ERROR_REGISTRATION_FIELD = 'SET_ERROR_REGISTRATION_FIELD'
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_USER_DATA;
  payload: UserState['data'];
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_DATA;
  payload: UserLoadingData;
}

export interface SetErrorMessageActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_ERROR_MESSAGE;
  payload: string;
}
export interface SetErrorRegistrationFieldActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_ERROR_REGISTRATION_FIELD;
  payload: string | undefined;
}
export interface SignUpDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SIGN_UP;
  payload: SignUpData;
}
export interface FetchUserJWTDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.FETCH_USER_JWT_DATA;
  payload: string;
}
export interface LoadJWTDataActionInterface extends Action<UserActionsType> {
  type: UserActionsType.LOAD_JWT_DATA;
}
export interface LogoutActionInterface extends Action<UserActionsType> {
  type: UserActionsType.LOGOUT;
}

export interface SetUserLoadingStateActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}

export interface SetUserRegistrationStateActionInterface extends Action<UserActionsType> {
  type: UserActionsType.SET_REGISTRATION_STATE;
  payload: RegistrationState;
}
