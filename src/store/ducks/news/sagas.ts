import { call, put, select, takeLatest } from "redux-saga/effects";
import { NewsApi } from "../../../services/api/newsApi";
import { TagsApi } from "../../../services/api/tagsApi";
import { selectJWT } from "../user/selectors";
import {
  addLeftNews,
  resetNews,
  setAddFormState,
  setAddMessage,
  setFetchedNewsPage,
  setLeftNews,
  setLeftNewsPage,
  setNews,
  setNewsLoadingState,
  setNewsToTop,
} from "./actionCreators";
import { selectFetchedNewsPage, selectLeftNewsPage } from "./selectors";
import {
  FetchAddNewsActionInterface,
  FetchLeftNewsFromTagActionInterface,
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
      pageNumber === 0
        ? yield put(resetNews(items))
        : yield put(setNews(items));
    }
  } catch (error) {
    // const pageNumber = yield select(selectFetchedNewsPage);
    // yield put(setFetchedNewsPage(pageNumber + 1));
    yield put(setNewsLoadingState(LoadingState.ERROR));
  }
}
export function* fetchLeftNewsRequest() {
  try {
    const leftItems = yield call(TagsApi.fetchNewsByTagName, "TRENDS", 0);
    yield put(setLeftNews(leftItems));
  } catch (error) {
    yield put(setNewsLoadingState(LoadingState.ERROR));
  }
}
export function* fetchLeftNewsFromTagWorker({
  payload,
}: FetchLeftNewsFromTagActionInterface) {
  try {
    const page = yield select(selectLeftNewsPage);
    const leftItems = yield call(TagsApi.fetchNewsByTagName, payload, page);
    yield put(addLeftNews(leftItems));
    yield put(setLeftNewsPage(page + 1));
  } catch {}
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
    yield put(
      setAddMessage("Чтобы добавлять записи необходимо авторизоваться")
    );
    yield put(setAddFormState(AddFormState.ERROR));
  }
}

export function* newsSaga() {
  yield takeLatest(NewsActionsType.FETCH_NEWS, fetchNewsRequest);
  yield takeLatest(NewsActionsType.FETCH_LEFT_NEWS, fetchLeftNewsRequest);
  yield takeLatest(
    NewsActionsType.FETCH_LEFT_NEWS_FROM_TAG,
    fetchLeftNewsFromTagWorker
  );
  yield takeLatest(NewsActionsType.FETCH_ADD_NEWS, fetchAddNewsRequest);
}
