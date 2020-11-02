import { News } from "../../news/typescript/state";

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export enum RegistrationState {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface UserLoadingData {
  username: string;
  password: string;
}
export interface SignUpData {
  email: string;
  fullname: string;
  username: string;
  password: string;
  password2: string
}
export interface User {
  _id : string;
  fullname: string;
  username: string;
  avatarUrl: string;
  token?: string;
  articles: News[];
}

export interface UserState {
  data: User | undefined;
  loadingState: LoadingState;
  registrationState: RegistrationState;
  errorMessage: string | undefined;
  invalidRegistrationField: string | undefined;
}
