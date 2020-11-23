import { call, put, select, takeLatest } from "redux-saga/effects";
import { NotificationsApi } from "../../../services/api/NotificationsApi";
import { selectJWT } from "../user/selectors";
import {
  setNotifications,
  setNotificationsLoadingState,
} from "./actionCreators";
import {
  DeleteNotificationByIdActionInterface,
  NotificationsActionsType,
} from "./typescript/actionTypes";
import { Notifications, NotificationsLoadingState } from "./typescript/state";

export function* fetchNotificationsRequest() {
  try {
    const checkedNotifications = localStorage.getItem("checked");
    const jwt = yield select(selectJWT);
    const items: Notifications[] = (yield call(
      NotificationsApi.fetchNotifications,
      jwt
    )).filter(
      (item: Notifications) => !checkedNotifications?.includes(item._id)
    );
    yield put(setNotifications(items));
  } catch (error) {
    yield put(setNotificationsLoadingState(NotificationsLoadingState.ERROR));
  }
}

export function* saveCheckedId({
  payload,
}: DeleteNotificationByIdActionInterface) {
  const checkedString = localStorage.getItem("checked");
  const checked: string[] = checkedString ? JSON.parse(checkedString) : [];
  checked.unshift(payload);
  if (checked.length > 80) {
    checked.pop();
  }
  localStorage.setItem("checked", JSON.stringify(checked));
  yield;
}

export function* notificationsSaga() {
  yield takeLatest(
    NotificationsActionsType.FETCH_NOTIFICATIONS,
    fetchNotificationsRequest
  );
  yield takeLatest(
    NotificationsActionsType.DELETE_NOTIFICATION_BY_ID,
    saveCheckedId
  );
}
