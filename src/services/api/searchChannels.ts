import axios from "axios";
import { Channel } from "../../store/ducks/searchChannel/typescript/state";
import { apiUrl } from "../config";

export const searchChannelsAPI = {
  
  fetchChannels(payload: string): Promise<Channel[]> {
    return axios
      .get(`${apiUrl}/users/search/${payload}`)
      .then(({ data }) => data.data);
  },
};
