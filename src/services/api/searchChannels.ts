import axios from "axios";
import { Channel } from "../../store/ducks/searchChannel/typescript/state";

export const searchChannelsAPI = {
  fetchChannels(payload: string): Promise<Channel[]> {
    return axios
      .get(`/users/search`, { params: { reqUsername: payload } })
      .then(({ data }) => data.data);
  },
};
