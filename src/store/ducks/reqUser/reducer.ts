import produce, { Draft } from "immer";
import { ReqUserActions } from "./actionCreators";
import { ReqUserActionsType } from "./typescript/actionTypes";
import { LoadingState, ReqUserState } from "./typescript/state";

const initialUserState: ReqUserState = {
  data: undefined,
  loadingState: LoadingState.NEVER,
  isSubscribed: undefined,
  page: undefined,
};

export const ReqUserReducer = produce(
  (draft: Draft<ReqUserState>, action: ReqUserActions) => {
    switch (action.type) {
      case ReqUserActionsType.SET_PAGE:
        draft.page = action.payload;
        break;
      case ReqUserActionsType.SET_REQ_USER_POSTS:
        draft.data?.articles.push(...action.payload);
        break;
      case ReqUserActionsType.SET_IS_SUBSCRIBED:
        draft.isSubscribed = action.payload;
        break;
      case ReqUserActionsType.SET_USER_DATA:
        draft.data = action.payload;
        draft.loadingState = LoadingState.LOADED;
        break;
      case ReqUserActionsType.FETCH_USER_DATA:
        draft.data = undefined;
        draft.loadingState = LoadingState.LOADING;
        break;
      case ReqUserActionsType.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;
      default:
        break;
    }
  },
  initialUserState
);
