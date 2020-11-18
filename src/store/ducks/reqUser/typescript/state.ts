import { User } from "../../user/typescript/state";

export enum LoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface ReqUser extends User {}

export interface ReqUserState {
  data: ReqUser | undefined;
  loadingState: LoadingState;
  isSubscribed: boolean | undefined;
  page: number | undefined;
}
