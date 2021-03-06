import axios from "axios";
import { News } from "../../store/ducks/news/typescript/state";
import { ReqUser } from "../../store/ducks/reqUser/typescript/state";
import {
  User,
  UserLoadingData,
  SignUpData,
} from "../../store/ducks/user/typescript/state";
import { apiUrl } from "../config";

export type TSignUpResp = {
  status: string;
  errors?: { msg: string; param: string }[];
  data?: [];
  message?: {
    name: string;
  };
};

export const UserApi = {
  // signUp(data: SignUpData): Promise<boolean> {
  //   return axios
  //     .post("/auth/registration", data)
  //     .then(({ data }) => data.status === "success");
  // },
  signUp(data: SignUpData): Promise<TSignUpResp> {
    return axios
      .post(`${apiUrl}/auth/registration`, data)
      .then(({ data }) => data)
      .catch((error) => {
        return error.response.data;
      });
  },
  login(data: UserLoadingData): Promise<User> {
    return axios.post(`${apiUrl}/auth/login`, data).then(({ data }) => data.data);
  },
  getUserFromJWT(jwt: string): Promise<User> {
    return axios
      .get(`${apiUrl}/users/me`, { headers: { token: jwt } })
      .then(({ data }) => data.data);
  },
  changeAvatar(jwt: string, payload: string): Promise<boolean> {
    return axios
      .post(
        `${apiUrl}/users/changeAvatar`,
        { image: payload },
        {
          headers: { token: jwt },
        }
      )
      .then(({ data }) => !!data.status)
      .catch(({ _ }) => false);
  },
  changeHeader(jwt: string, payload: string): Promise<boolean> {
    return axios
      .post(
        `${apiUrl}/users/changeHeader`,
        { image: payload },
        {
          headers: { token: jwt },
        }
      )
      .then(({ data }) => !!data.status)
      .catch(({ _ }) => false);
  },
  fetchUserByUsername(username: string): Promise<ReqUser> {
    return axios.get(`${apiUrl}/users/${username}`).then(({ data }) => data.data);
  },
  fetchUserPostsByUsername(username: string, page: number): Promise<News[]> {
    return axios
      .get(`${apiUrl}/posts/${username}`, {
        params: { page: page },
      })
      .then(({ data }) => data.data);
  },
  sub(payload: any, jwt: string) {
    axios.post(`${apiUrl}/sub/`, payload, {
      headers: { token: jwt },
    });
  },
  isSubscribed(payload: any, jwt: string): Promise<boolean> {
    return axios
      .post(`${apiUrl}/sub/isSubscribed`, payload, {
        headers: { token: jwt },
      })
      .then(({ data }) => data.data.isSubscribed);
  },
};
