// import axios from "axios";
import { Channel } from "../../store/ducks/searchChannel/typescript/state";

export const searchChannelsAPI = {
  fetchChannels(payload: string): Channel[] {
    // return axios.get(`/trends/tags`).then(({ data }) => data.data);
    return [{
        type: "TELEGRAM",
        name: "2ch",
        link: "/user/wwr",
        avatarUrl: "https://images.unsplash.com/photo-1606211182540-3d7889e6b96d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
        type: "WWR",
        link: "/user/wwr",
        name: "wwr",
        avatarUrl: "https://images.unsplash.com/photo-1606235268286-cfc161fed099?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
    }]
  },
};
