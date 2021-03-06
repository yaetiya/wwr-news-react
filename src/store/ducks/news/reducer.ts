import produce, { Draft } from "immer";
import { NewsActions } from "./actionCreators";
import { NewsActionsType } from "./typescript/actionTypes";
import { AddFormState, LoadingState, NewsState } from "./typescript/state";

const initialNewsState: NewsState = {
  items: [],
  leftItems: [],
  addFormState: AddFormState.NEVER,
  loadingState: LoadingState.NEVER,
  addNewsMessage: "",
  fetchedNewsPage: 0,
  leftNewsPage: 0,
};

export const newsReducer = produce(
  (draft: Draft<NewsState>, action: NewsActions) => {
    switch (action.type) {
      case NewsActionsType.RESET_NEWS:
        draft.items = action.payload;
        draft.loadingState = LoadingState.LOADED;
        break;
      case NewsActionsType.SET_FETCHED_NEWS_PAGE:
        draft.fetchedNewsPage = action.payload;
        break;
      case NewsActionsType.SET_NEWS:
        draft.items = [...draft.items, ...action.payload];
        draft.loadingState = LoadingState.LOADED;
        break;
      case NewsActionsType.SET_NEWS_TO_TOP:
        draft.items.unshift(...action.payload);
        draft.loadingState = LoadingState.LOADED;
        break;
      case NewsActionsType.SET_LEFT_NEWS:
        draft.leftItems = action.payload;
        break;
      case NewsActionsType.ADD_LEFT_NEWS:
        draft.leftItems.push(...action.payload);
        break;
      case NewsActionsType.SET_LEFT_NEWS_PAGE:
        draft.leftNewsPage = action.payload;
        break;
      case NewsActionsType.FETCH_NEWS:
        draft.loadingState = LoadingState.LOADING;
        break;

      case NewsActionsType.SET_LOADING_STATE:
        draft.loadingState = action.payload;
        break;

      case NewsActionsType.SET_ADD_MESSAGE:
        draft.addNewsMessage = action.payload;
        break;
      case NewsActionsType.SET_ADD_FORM_STATE:
        draft.addFormState = action.payload;
        break;

      case NewsActionsType.FETCH_ADD_NEWS:
        draft.addFormState = AddFormState.LOADING;
        break;

      default:
        break;
    }
  },
  initialNewsState
);
