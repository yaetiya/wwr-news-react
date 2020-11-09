import {
  SetNotificationsActionInterface,
  NotificationsActionsType,
  SetNotificationsLoadingStateActionInterface,
  FetchNotificationsActionInterface,
  DeleteNotificationByIdActionInterface,
} from "./typescript/actionTypes";
import {
  NotificationsLoadingState,
  NotificationsState,
} from "./typescript/state";

export const setNotifications = (
  payload: NotificationsState["items"]
): SetNotificationsActionInterface => ({
  type: NotificationsActionsType.SET_NOTIFICATIONS,
  payload,
});

export const deleteNotificationById = (
  payload: string
): DeleteNotificationByIdActionInterface => ({
  type: NotificationsActionsType.DELETE_NOTIFICATION_BY_ID,
  payload,
});

// export const fetchAddNotifications = (payload: preNotifications): FetchAddNotificationsActionInterface => ({
//   type: NotificationsActionsType.FETCH_ADD_NOTIFICATIONS,
//   payload,
// });

export const setNotificationsLoadingState = (
  payload: NotificationsLoadingState
): SetNotificationsLoadingStateActionInterface => ({
  type: NotificationsActionsType.SET_LOADING_STATE,
  payload,
});

// export const setAddMessage = (
//   payload: string
// ): SetAddMessage => ({
//   type: NotificationsActionsType.SET_ADD_MESSAGE,
//   payload,
// });

// export const setAddFormState = (
//   payload: AddFormState
// ): SetAddFormStateActionInterface => ({
//   type: NotificationsActionsType.SET_ADD_FORM_STATE,
//   payload,
// });

export const fetchNotifications = (): FetchNotificationsActionInterface => ({
  type: NotificationsActionsType.FETCH_NOTIFICATIONS,
});

export type NotificationsActions =
  | SetNotificationsActionInterface
  | FetchNotificationsActionInterface
  | SetNotificationsLoadingStateActionInterface
  | DeleteNotificationByIdActionInterface;
// | FetchAddNotificationsActionInterface
// | SetAddFormStateActionInterface
// | SetAddMessage
