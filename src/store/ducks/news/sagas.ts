import { call, put, select, takeLatest } from "redux-saga/effects";
import { NewsApi } from "../../../services/api/newsApi";
import { selectJWT } from "../user/selectors";
import {
  setAddFormState,
  setAddMessage,
  setFetchedNewsPage,
  setLeftNews,
  setNews,
  setNewsLoadingState,
  setNewsToTop,
} from "./actionCreators";
import { selectFetchedNewsPage } from "./selectors";
import {
  FetchAddNewsActionInterface,
  NewsActionsType,
} from "./typescript/actionTypes";
import {
  AddFormState,
  fetchNewsInterface,
  LoadingState,
  News,
} from "./typescript/state";

export function* fetchNewsRequest() {
  try {
    const jwt = yield select(selectJWT);
    if (jwt) {
      const pageNumber = yield select(selectFetchedNewsPage);
      const payload: fetchNewsInterface = {
        page: pageNumber,
      };
      yield put(setFetchedNewsPage(pageNumber + 1));
      const items: News[] = yield call(NewsApi.fetchNews, payload, jwt);
      yield put(setNews(items));
    } else {
      const leftItems = yield call(NewsApi.fetchLeftNews);
      yield put(setNews(leftItems));
    }
  } catch (error) {
    yield put(setNewsLoadingState(LoadingState.ERROR));
  }
}
export function* fetchLeftNewsRequest() {
  try {
    const leftItems = yield call(NewsApi.fetchLeftNews);
    yield put(setLeftNews(leftItems));
  } catch (error) {
    yield put(setNewsLoadingState(LoadingState.ERROR));
  }
}

export function* fetchAddNewsRequest({ payload }: FetchAddNewsActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    const message = yield call(NewsApi.addNews, payload, jwt);
    if (typeof message !== "string") {
      yield put(setAddFormState(AddFormState.LOADED));
      yield put(setAddMessage(""));
      yield put(setNewsToTop([message]));
    } else {
      yield put(setAddFormState(AddFormState.ERROR));
      yield put(setAddMessage(message));
    }
  } catch (error) {
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* newsSaga() {
  yield takeLatest(NewsActionsType.FETCH_NEWS, fetchNewsRequest);
  yield takeLatest(NewsActionsType.FETCH_LEFT_NEWS, fetchLeftNewsRequest);
  yield takeLatest(NewsActionsType.FETCH_ADD_NEWS, fetchAddNewsRequest);
}
