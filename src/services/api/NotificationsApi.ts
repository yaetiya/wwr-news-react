import axios from "axios";
import { NotificationsState } from "../../store/ducks/notifications/typescript/state";

export const NotificationsApi = {
  fetchNotifications(jwt: string): Promise<NotificationsState["items"]> {
    return axios
      .get("/notifications/", { headers: { token: jwt } })
      .then(({ data }) => data.data);
  },
};
