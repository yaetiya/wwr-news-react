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

export function* oneNewsSaga() {
  yield takeEvery(
    OneNewsActionsType.FETCH_ONE_NEWS_DATA,
    fetchOneNewsDataRequest
  );
  yield takeEvery(OneNewsActionsType.SEND_COMMENT, fetchSendComment);
}
