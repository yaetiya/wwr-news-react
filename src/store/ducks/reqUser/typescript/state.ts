import { User } from "../../user/typescript/state";

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface ReqUserState {
  data: User | undefined;
  loadingState: LoadingState;
}
