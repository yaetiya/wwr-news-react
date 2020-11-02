import axios from "axios";
import {
  News,
  NewsState,
  preNews,
} from "../../store/ducks/news/typescript/state";

export const NewsApi = {
  // fetchNews(): Promise<NewsState["items"]> {
  fetchNews(): Promise<NewsState["items"]> {
    /*TODO
    ADD JWT to header    
    */
    return axios
      .get("http://localhost:8888/articles")
      .then(({ data }) => data.data);
  },
  fetchLeftNews(): Promise<NewsState["leftItems"]> {
    // return axios.get('/tweets?_sort=id&_order=desc').then(({ data }) => data);
    return axios
      .get("http://localhost:8888/trends")
      .then(({ data }) => data.data);
  },
  // fetchOneNewsData(id: string): Promise<News[]> {
  //   return axios.get("/tweets?_id=" + id).then(({ data }) => data);
  // },
  fetchOneNewsData(id: string): Promise<News> {
    return axios
      .get(`http://localhost:8888/articles/${id}`)
      .then(({ data }) => data.data);
  },
  // addNews(payload: preNews): Promise<News> {
  addNews(payload: preNews, jwt: string): Promise<News | string> {
    return axios
      .post("http://localhost:8888/articles/add", payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data)
      .catch((error) => error.response.data.errors[0].msg);
  },
};
