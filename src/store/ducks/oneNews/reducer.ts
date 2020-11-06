import produce, { Draft } from "immer";
import { LoadingState } from "../news/typescript/state";
import { OneNewsActions } from "./actionCreators";
import { OneNewsActionsType } from "./typescript/actionTypes";
import { OneNewsState } from "./typescript/state";

const initialOneNewsState: OneNewsState = {
  data: undefined,
  loadingState: LoadingState.NEVER,
  addCommentErrorMessage: undefined,
};

export const oneNewsReducer = produce(
  (draft: Draft<OneNewsState>, action: OneNewsActions) => {
    switch (action.type) {
      case OneNewsActionsType.SET_ONE_NEWS_DATA:
        draft.data = action.payload;
        draft.loadingState = LoadingState.LOADED;
        break;
      case OneNewsActionsType.SET_COMMENT_ONE_NEWS_DATA:
        draft.data?.commentsId.unshift(action.payload);
        draft.addCommentErrorMessage = undefined;
        break;
      case OneNewsActionsType.FETCH_ONE_NEWS_DATA:
        draft.data = undefined;
        draft.loadingState = LoadingState.LOADING;
        break;

      case OneNewsActionsType.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      case OneNewsActionsType.SEND_COMMENT:
        break;
      case OneNewsActionsType.SET_ERROR_MESSAGE:
        draft.addCommentErrorMessage = action.payload;
        break;

      default:
        break;
    }
  },
  initialOneNewsState
);
