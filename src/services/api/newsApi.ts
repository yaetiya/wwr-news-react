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
      .get("/articles", { params: payload, headers: { token: jwt }})
      .then(({ data }) => data.data);
  },
  fetchOneNewsData(id: string): Promise<News> {
    return axios
      .get(`/articles/${id}`)
      .then(({ data }) => data.data);
  },
  addNews(payload: preNews, jwt: string): Promise<News | string> {
    return axios
      .post("/articles/add", payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.errors[0].msg);
  },
  deleteNews (id: string, jwt: string): Promise<boolean> {
    return axios.post("/articles/delete/", {_id: id}, {
      headers: { token: jwt },
    })
  },
  fetchComment(payload: TPreComment, jwt: string): Promise<string | Comment>{
    return axios
      .post("/comment", payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.errors[0].msg);
  }
};
