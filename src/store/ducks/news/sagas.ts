import { call, put, select, takeLatest } from "redux-saga/effects";
import { NewsApi } from "../../../services/api/newsApi";
import { selectJWT } from "../user/selectors";
import {
  setAddFormState,
  setAddMessage,
  setLeftNews,
  setNews,
  setNewsLoadingState,
} from "./actionCreators";
import {
  FetchAddNewsActionInterface,
  NewsActionsType,
} from "./typescript/actionTypes";
import { AddFormState, LoadingState, News } from "./typescript/state";

export function* fetchNewsRequest() {
  try {
    const items: News[] = yield call(NewsApi.fetchNews);
    yield put(setNews(items));
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
    console.log(message);
    if (typeof message !== "string") {
      yield put(setAddFormState(AddFormState.LOADED));
      yield put(setAddMessage(""));
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
