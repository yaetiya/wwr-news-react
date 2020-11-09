
export enum NotificationsLoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

// export enum NotificationsAddFormState {
//   LOADING = "LOADING",
//   ERROR = "ERROR",
//   NEVER = "NEVER",
//   LOADED = "LOADED",
// }

// export interface preNotifications {
//   headline: string;
//   text: string;
// }


export interface Notifications {
  _id: string;
  rank: number;
  text: string;
  headline: string;
  date: string;
}

export interface NotificationsState {
  items: Notifications[];
  notificationsLoadingState: NotificationsLoadingState;
  // notificationsAddFormState: NotificationsAddFormState;
  // addNotificationsMessage: string;
}
