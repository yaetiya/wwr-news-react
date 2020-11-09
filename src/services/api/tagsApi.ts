import axios from "axios";
import { News } from "../../store/ducks/news/typescript/state";
import { TagsState } from "../../store/ducks/tags/typescript/state";

export const TagsApi = {
  // fetchTags(): Promise<TagsState['items']> {
  //   return axios.get('/tags').then(({ data }) => data);
  // },
  fetchTags(): TagsState["items"] {
    return [
      {
        name: "Trends",
      },
      {
        name: "Технологии",
      },
      {
        name: "Наука",
      },
    ];
  },
  fetchNewsByTagName(payload: string): Promise<News[]> {
    return axios
      .get(`http://localhost:8888/tags/${payload}`)
      .then(({ data }) => data.data);
  },
};
