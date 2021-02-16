import axios from "axios";
import { NotificationsState } from "../../store/ducks/notifications/typescript/state";
import { apiUrl } from "../config";

export const NotificationsApi = {
  fetchNotifications(jwt: string): Promise<NotificationsState["items"]> {
    return axios
      .get(`${apiUrl}/notifications/`, { headers: { token: jwt } })
      .then(({ data }) => data.data);
  },
};
