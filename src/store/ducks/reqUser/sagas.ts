import { call, put, takeEvery } from "redux-saga/effects";
import { UserApi } from "../../../services/api/userApi";
import { User } from "../user/typescript/state";
import { setReqUserData, setReqUserLoadingState } from "./actionCreators";
import { FetchReqUserDataActionInterface, ReqUserActionsType } from "./typescript/actionTypes";
import { LoadingState } from "./typescript/state";

export function* fetchReqUserDataRequest({
  payload: username,
}: FetchReqUserDataActionInterface) {
  try {
    const user: User = yield call(UserApi.fetchUserByUsername, username);
    if (user){
      yield put(setReqUserData(user));
      yield put(setReqUserLoadingState(LoadingState.LOADED));
    }else{
      yield put(setReqUserLoadingState(LoadingState.ERROR));
    }
  } catch (error) {
    yield put(setReqUserLoadingState(LoadingState.ERROR));
  }
}

export function* ReqUserSaga() {
  yield takeEvery(ReqUserActionsType.FETCH_USER_DATA, fetchReqUserDataRequest);
}
