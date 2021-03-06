import produce, { Draft } from "immer";
import { LoadingState } from "../news/typescript/state";
import { UserActions } from "./actionCreators";
import { UserActionsType } from "./typescript/actionTypes";
import {
  ChangeAvatarState,
  RegistrationState,
  UserState,
} from "./typescript/state";

const initialUserState: UserState = {
  errorMessage: undefined,
  data: undefined,
  loadingState: LoadingState.NEVER,
  registrationState: RegistrationState.NEVER,
  invalidRegistrationField: undefined,
  jwt: undefined,
  changeAvatarState: ChangeAvatarState.NEVER,
};

export const UserReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case UserActionsType.SET_ONLY_JWT:
        draft.jwt = action.payload;
        break;
      case UserActionsType.SET_CHANGE_AVATAR_STATE:
        draft.changeAvatarState = action.payload;
        break;
      case UserActionsType.CHANGE_FETCHED_USER_AVATAR:
        if (draft.data?.avatarUrl) {
          draft.data.avatarUrl = action.payload;
        }
        break;
      case UserActionsType.CHANGE_FETCHED_USER_HEADER:
        if (draft.data?.headerUrl) {
          draft.data.headerUrl = action.payload;
        }
        break;
      case UserActionsType.SET_USER_DATA:
        draft.data = action.payload;
        draft.loadingState = LoadingState.LOADED;
        draft.registrationState = RegistrationState.NEVER;
        if (action.payload?.token) {
          localStorage.setItem("jwt", action.payload.token);
        }
        break;
      case UserActionsType.SET_ERROR_MESSAGE:
        draft.errorMessage = action.payload;
        draft.registrationState = RegistrationState.ERROR;
        break;
      case UserActionsType.LOGOUT:
        draft.data = undefined;
        break;
      case UserActionsType.SET_REGISTRATION_STATE:
        draft.registrationState = action.payload;
        break;
      case UserActionsType.FETCH_USER_DATA:
        draft.data = undefined;
        draft.loadingState = LoadingState.LOADING;
        break;
      case UserActionsType.SET_ERROR_REGISTRATION_FIELD:
        draft.invalidRegistrationField = action.payload;
        break;
      case UserActionsType.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;
      default:
        break;
    }
  },
  initialUserState
);
