import { call, put, select, takeEvery } from "redux-saga/effects";
import { UserApi } from "../../../services/api/userApi";
import { selectJWT } from "../user/selectors";
import {
  FetchReqUserPostsData,
  setIsSubscribedData,
  SetPageData,
  setReqUserData,
  setReqUserLoadingState,
  SetReqUserPostsData,
} from "./actionCreators";
import {
  selectReqUserData,
  selectReqUserPage,
  selectReqUserUsername,
} from "./selectors";
import {
  FetchReqUserDataActionInterface,
  ReqUserActionsType,
  SubscribeActionInterface,
} from "./typescript/actionTypes";
import { LoadingState, ReqUser } from "./typescript/state";

export function* fetchReqUserDataRequest({
  payload: username,
}: FetchReqUserDataActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    const user: ReqUser = yield call(UserApi.fetchUserByUsername, username);
    if (user) {
      if (jwt) {
        const isSubscribed = yield call(
          UserApi.isSubscribed,
          { userId: user._id },
          jwt
        );

        yield put(setIsSubscribedData(isSubscribed));
      }
      yield put(setReqUserData(user));
      yield put(SetPageData(0));
      yield put(FetchReqUserPostsData());
      yield put(setReqUserLoadingState(LoadingState.LOADED));
    } else {
      yield put(setReqUserLoadingState(LoadingState.ERROR));
    }
  } catch (error) {
    yield put(setReqUserLoadingState(LoadingState.ERROR));
  }
}

export function* subscribeWorker({ payload }: SubscribeActionInterface) {
  try {
    const reqUser = yield select(selectReqUserData);
    const jwt = yield select(selectJWT);
    const data = { type: "SUBSCRIBE", userId: payload };
    yield call(UserApi.sub, data, jwt);
    yield put(setIsSubscribedData(true));
    yield put(
      setReqUserData({ ...reqUser, subscribers: reqUser.subscribers + 1 })
    );
  } catch {}
}

export function* unsubscribeWorker({ payload }: SubscribeActionInterface) {
  try {
    const reqUser = yield select(selectReqUserData);
    const jwt = yield select(selectJWT);
    const data = { type: "UNSUBSCRIBE", userId: payload };
    yield call(UserApi.sub, data, jwt);
    yield put(setIsSubscribedData(false));
    yield put(
      setReqUserData({ ...reqUser, subscribers: reqUser.subscribers - 1 })
    );
  } catch {}
}

export function* fetchReqUserPostsWorker() {
  try {
    const username = yield select(selectReqUserUsername);
    const page = yield select(selectReqUserPage);
    const posts = yield call(UserApi.fetchUserPostsByUsername, username, page);
    yield put(SetPageData(page + 1));
    yield put(SetReqUserPostsData(posts));
  } catch {}
}

export function* ReqUserSaga() {
  yield takeEvery(ReqUserActionsType.FETCH_USER_DATA, fetchReqUserDataRequest);
  yield takeEvery(ReqUserActionsType.SUBSCRIBE, subscribeWorker);
  yield takeEvery(ReqUserActionsType.UNSUBSCRIBE, unsubscribeWorker);
  yield takeEvery(
    ReqUserActionsType.FETCH_REQ_USER_POSTS,
    fetchReqUserPostsWorker
  );
}
