import axios from "axios";
import { News } from "../../store/ducks/news/typescript/state";
import { TagsState } from "../../store/ducks/tags/typescript/state";

export const TagsApi = {
  // fetchTags(): Promise<TagsState['items']> {
  //   return axios.get('/tags').then(({ data }) => data);
  // },
  fetchTags(): Promise<TagsState["items"]> {
    return axios
      .get(`http://localhost:8888/trends/tags`)
      .then(({ data }) => data.data);
  },
  fetchNewsByTagName(payload: string, page: number): Promise<News[]> {
    return axios
      .get(`http://localhost:8888/tags/${payload}`, { params: { page: page } })
      .then(({ data }) => data.data);
  },
};
