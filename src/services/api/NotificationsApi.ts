import axios from "axios";
import { NotificationsState } from "../../store/ducks/notifications/typescript/state";

export const NotificationsApi = {
  fetchNotifications(): Promise<NotificationsState["items"]> {
    return axios
      .get("http://localhost:8888/notifications/")
      .then(({ data }) => data.data);
  },
};
