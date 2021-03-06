import { call, put, select, takeEvery } from "redux-saga/effects";
import { TSignUpResp, UserApi } from "../../../services/api/userApi";
import {
  fetchNews,
  resetNews,
  setFetchedNewsPage,
  setLeftNews,
} from "../news/actionCreators";
import { fetchNotifications } from "../notifications/actionCreators";
import {
  loadUserJWTData,
  setChangeAvatarState,
  setErrorMessageData,
  setErrorRegistrationFieldData,
  setOnlyJWTData,
  setUserData,
  setUserLoadingState,
  setUserRegistrationState,
} from "./actionCreators";
import { selectJWT } from "./selectors";
import {
  ChangeAvatarActionInterface,
  FetchUserDataActionInterface,
  SignUpDataActionInterface,
  UserActionsType,
} from "./typescript/actionTypes";
import {
  ChangeAvatarState,
  LoadingState,
  RegistrationState,
  User,
} from "./typescript/state";

export function* fetchUserDataRequest({
  payload: UserLoadingData,
}: FetchUserDataActionInterface) {
  try {
    const user: User = yield call(UserApi.login, UserLoadingData);
    if (user.token) {
      const data: User = yield call(UserApi.getUserFromJWT, user.token);
      yield put(setUserData({ ...data, token: user.token }));
      yield put(fetchNotifications());
      yield put(fetchNews());
    } else {
      yield put(setUserLoadingState(LoadingState.ERROR));
    }
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}
export function* changeAvatarWorker({ payload }: ChangeAvatarActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    yield put(setChangeAvatarState(ChangeAvatarState.LOADING));
    const isChangeSuccessfully = yield call(UserApi.changeAvatar, jwt, payload);
    if (isChangeSuccessfully) {
      yield put(loadUserJWTData());
      yield put(setChangeAvatarState(ChangeAvatarState.LOADED));
    }
  } catch {
    yield put(setChangeAvatarState(ChangeAvatarState.ERROR));
  }
}
export function* changeHeaderWorker({ payload }: ChangeAvatarActionInterface) {
  try {
    const jwt = yield select(selectJWT);
    yield put(setChangeAvatarState(ChangeAvatarState.LOADING));
    const isChangeSuccessfully = yield call(UserApi.changeHeader, jwt, payload);
    if (isChangeSuccessfully) {
      yield put(loadUserJWTData());
      yield put(setChangeAvatarState(ChangeAvatarState.LOADED));
    }
  } catch {
    yield put(setChangeAvatarState(ChangeAvatarState.ERROR));
  }
}
export function* fetchUserFromJWTDataRequest() {
  try {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      yield put(setOnlyJWTData(jwt));
      const data: User = yield call(UserApi.getUserFromJWT, jwt);
      if (data) {
        yield put(setUserData({ ...data, ...{ token: jwt } }));
      } else {
        yield put(setUserLoadingState(LoadingState.ERROR));
      }
    }
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.NEVER));
  }
}

export function* logoutWorker() {
  try {
    delete localStorage["jwt"];
    delete localStorage["checked"];
    yield put(setUserData(undefined));
    yield put(setUserLoadingState(LoadingState.NEVER));
    yield put(resetNews([]));
    yield put(setOnlyJWTData(undefined));
    yield put(setLeftNews([]));
    yield put(setFetchedNewsPage(0));
  } catch (error) {
    yield put(setUserLoadingState(LoadingState.ERROR));
  }
}

export function* signUpWorker({
  payload: UserSignUpData,
}: SignUpDataActionInterface) {
  try {
    const RegistrationData: TSignUpResp = yield call(
      UserApi.signUp,
      UserSignUpData
    );
    if (RegistrationData.errors) {
      if (RegistrationData.errors[0].msg) {
        yield put(setErrorMessageData(RegistrationData.errors[0].msg));
        yield put(
          setErrorRegistrationFieldData(RegistrationData.errors[0].param)
        );
      }
      yield put(setUserRegistrationState(RegistrationState.ERROR));
    } else if (RegistrationData.message?.name) {
      yield put(
        setErrorMessageData(
          "The user with the same email or username already exists"
        )
      );
      yield put(setErrorRegistrationFieldData(undefined));
    } else {
      yield put(setUserRegistrationState(RegistrationState.SUCCESS));
      setErrorRegistrationFieldData(undefined);
    }
  } catch (error) {
    yield put(setErrorMessageData("Bad request"));
    yield put(setErrorRegistrationFieldData(undefined));
    yield put(setUserRegistrationState(RegistrationState.ERROR));
  }
}

export function* UserSaga() {
  yield takeEvery(UserActionsType.SIGN_UP, signUpWorker);
  yield takeEvery(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
  yield takeEvery(UserActionsType.LOAD_JWT_DATA, fetchUserFromJWTDataRequest);
  yield takeEvery(UserActionsType.LOGOUT, logoutWorker);
  yield takeEvery(UserActionsType.CHANGE_AVATAR, changeAvatarWorker);
  yield takeEvery(UserActionsType.CHANGE_HEADER, changeHeaderWorker);
}
