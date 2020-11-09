import axios from "axios";
import {
  fetchNewsInterface,
  News,
  NewsState,
  preNews,
} from "../../store/ducks/news/typescript/state";
import { TPreComment } from "../../store/ducks/oneNews/typescript/state";

export const NewsApi = {
  fetchNews(payload: fetchNewsInterface, jwt: string): Promise<NewsState["items"]> {
    return axios
      .get("http://localhost:8888/articles", { params: payload, headers: { token: jwt }})
      .then(({ data }) => data.data);
  },
  fetchLeftNews(): Promise<NewsState["leftItems"]> {
    return axios
      .get("http://localhost:8888/left")
      .then(({ data }) => data.data);
  },
  fetchOneNewsData(id: string): Promise<News> {
    return axios
      .get(`http://localhost:8888/articles/${id}`)
      .then(({ data }) => data.data);
  },
  addNews(payload: preNews, jwt: string): Promise<News | string> {
    return axios
      .post("http://localhost:8888/articles/add", payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.errors[0].msg);
  },
  fetchComment(payload: TPreComment, jwt: string): Promise<string | Comment>{
    return axios
      .post("http://localhost:8888/comment", payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.errors[0].msg);
  }
};
