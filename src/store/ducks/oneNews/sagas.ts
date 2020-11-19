import { call, put, select, takeEvery } from "redux-saga/effects";
import { NewsApi } from "../../../services/api/newsApi";
import { News } from "../news/typescript/state";
import { selectJWT } from "../user/selectors";
import {
  setCommentOneNewsData,
  setErrorMessageOneNewsData,
  setOneNewsData,
  setOneNewsLoadingState,
} from "./actionCreators";
import {
  DeleteOneNewsActionInterface,
  FetchOneNewsDataActionInterface,
  OneNewsActionsType,
  SendCommentDataActionInterface,
} from "./typescript/actionTypes";
import { LoadingState } from "./typescript/state";

export function* fetchOneNewsDataRequest({
  payload,
}: FetchOneNewsDataActionInterface) {
  try {
    const data: News = yield call(NewsApi.fetchOneNewsData, payload);
    yield put(setOneNewsData(data));
  } catch (error) {
    yield put(setOneNewsLoadingState(LoadingState.ERROR));
  }
}

export function* fetchSendComment({ payload }: SendCommentDataActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    const data = yield call(NewsApi.fetchComment, payload, jwt);
    if (typeof data === "string") {
      yield put(setErrorMessageOneNewsData(data));
    } else {
      yield put(setCommentOneNewsData(data));
    }
    // yield put(setOneNewsData(data));
  } catch (error) {
    // yield put(setOneNewsLoadingState(LoadingState.ERROR));
  }
}

export function* deleteOneNewsWorker({
  payload,
}: DeleteOneNewsActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    const isDeleted = yield call(NewsApi.deleteNews, payload, jwt);
    if (isDeleted) {
      yield put(setOneNewsLoadingState(LoadingState.DELETED));
    } else {
      yield put(setOneNewsLoadingState(LoadingState.NOT_DELETED));
    }
  } catch {
    yield put(setOneNewsLoadingState(LoadingState.NOT_DELETED));
  }
}

export function* oneNewsSaga() {
  yield takeEvery(
    OneNewsActionsType.FETCH_ONE_NEWS_DATA,
    fetchOneNewsDataRequest
  );
  yield takeEvery(OneNewsActionsType.SEND_COMMENT, fetchSendComment);
  yield takeEvery(OneNewsActionsType.DELETE_ONE_NEWS, deleteOneNewsWorker);
}
