import { Action } from "redux";
import { NotificationsLoadingState, NotificationsState } from "./state";

export enum NotificationsActionsType {
  SET_NOTIFICATIONS = "notifications/SET_NOTIFICATIONS",
  SET_NOTIFICATIONS_TO_TOP = "notifications/SET_NOTIFICATIONS_TO_TOP",
  FETCH_NOTIFICATIONS = "notifications/FETCH_NOTIFICATIONS",
  SET_LOADING_STATE = "notifications/SET_LOADING_STATE",
  DELETE_NOTIFICATION_BY_ID = "notifications/DELETE_NOTIFICATION_BY_ID"
  // FETCH_ADD_NOTIFICATIONS = "notifications/FETCH_ADD_NOTIFICATIONS",
  // ADD_NOTIFICATIONS = "notifications/ADD_NOTIFICATIONS",
  // SET_ADD_FORM_STATE = "notifications/SET_ADD_FORM_STATE",
  // SET_ADD_MESSAGE = "notifications/SET_ADD_MESSAGE",
}

export interface SetNotificationsActionInterface extends Action<NotificationsActionsType> {
  type: NotificationsActionsType.SET_NOTIFICATIONS;
  payload: NotificationsState["items"];
}

export interface DeleteNotificationByIdActionInterface extends Action<NotificationsActionsType> {
  type: NotificationsActionsType.DELETE_NOTIFICATION_BY_ID;
  payload: string;
}

// export interface FetchAddNotificationsActionInterface extends Action<NotificationsActionsType> {
//   type: NotificationsActionsType.FETCH_ADD_NOTIFICATIONS;
//   payload: preNotifications;
// }

// export interface SetAddMessage extends Action<NotificationsActionsType> {
//   type: NotificationsActionsType.SET_ADD_MESSAGE;
//   payload: string;
// }

export interface FetchNotificationsActionInterface extends Action<NotificationsActionsType> {
  type: NotificationsActionsType.FETCH_NOTIFICATIONS;
}


export interface SetNotificationsLoadingStateActionInterface
  extends Action<NotificationsActionsType> {
  type: NotificationsActionsType.SET_LOADING_STATE;
  payload: NotificationsLoadingState;
}

// export interface SetAddFormStateActionInterface
//   extends Action<NotificationsActionsType> {
//   type: NotificationsActionsType.SET_ADD_FORM_STATE;
//   payload: AddFormState;
// }
