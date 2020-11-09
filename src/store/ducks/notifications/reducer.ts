import produce, { Draft } from "immer";
import { NotificationsActions } from "./actionCreators";
import { NotificationsActionsType } from "./typescript/actionTypes";
import {
  NotificationsState,
  NotificationsLoadingState,
} from "./typescript/state";

const initialNotificationsState: NotificationsState = {
  items: [],
  // notificationsAddFormState: NotificationsAddFormState.NEVER,
  notificationsLoadingState: NotificationsLoadingState.NEVER,
  // addNotificationsMessage: "",
};

export const notificationsReducer = produce(
  (draft: Draft<NotificationsState>, action: NotificationsActions) => {
    switch (action.type) {
      case NotificationsActionsType.SET_NOTIFICATIONS:
        draft.items = action.payload;
        draft.notificationsLoadingState = NotificationsLoadingState.LOADED;
        break;
      case NotificationsActionsType.DELETE_NOTIFICATION_BY_ID:
        draft.items = draft.items.filter((x) => x._id !== action.payload);
        break;
      case NotificationsActionsType.FETCH_NOTIFICATIONS:
        // draft.items = [];
        draft.notificationsLoadingState = NotificationsLoadingState.LOADING;
        // if (draft.items.length === 0){
        //   draft.loadingState = LoadingState.LOADING;
        // }
        break;

      case NotificationsActionsType.SET_LOADING_STATE:
        draft.notificationsLoadingState = action.payload;
        break;
      // case NotificationsActionsType.SET_ADD_MESSAGE:
      //   draft.addNotificationsMessage = action.payload;
      //   break;
      // case NotificationsActionsType.SET_ADD_FORM_STATE:
      //   draft.addFormState = action.payload;
      //   break;

      // case NotificationsActionsType.FETCH_ADD_NOTIFICATIONS:
      //   draft.addFormState = AddFormState.LOADING;
      //   break;

      default:
        break;
    }
  },
  initialNotificationsState
);
