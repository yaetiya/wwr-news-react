import { createSelector } from "reselect";
import { RootState } from "../../store";
import {
  NotificationsLoadingState,
  NotificationsState,
} from "./typescript/state";

export const selectNotifications = (state: RootState): NotificationsState =>
  state.notifications;

export const selectLoadingState = (
  state: RootState
): NotificationsLoadingState =>
  selectNotifications(state).notificationsLoadingState;

export const selectIsNotificationsLoading = (state: RootState): boolean =>
  selectLoadingState(state) === NotificationsLoadingState.LOADING;

export const selectIsNotificationsLoaded = (state: RootState): boolean =>
  selectLoadingState(state) === NotificationsLoadingState.LOADED;

export const selectNotificationsItems = createSelector(
  selectNotifications,
  (notifications) => notifications.items
);
