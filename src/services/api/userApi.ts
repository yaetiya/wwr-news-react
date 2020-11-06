import axios from "axios";
import {
  User,
  UserLoadingData,
  SignUpData,
} from "../../store/ducks/user/typescript/state";

export type TSignUpResp = {
  status: string;
  errors?: { msg: string; param: string }[];
  data?: [];
  message?: {
    name: string;
  }
};

export const UserApi = {
  // signUp(data: SignUpData): Promise<boolean> {
  //   return axios
  //     .post("http://localhost:8888/auth/registration", data)
  //     .then(({ data }) => data.status === "success");
  // },
  signUp(data: SignUpData): Promise<TSignUpResp> {
    return axios
      .post("http://localhost:8888/auth/registration", data)
      .then(({ data }) => data)
      .catch((error) => {
        return error.response.data;
      });
  },
  login(data: UserLoadingData): Promise<User> {
    return axios
      .post("http://localhost:8888/auth/login", data)
      .then(({ data }) => data.data);
  },
  getUserFromJWT(jwt: string): Promise<User> {
    return axios
      .get("http://localhost:8888/users/me", { headers: { token: jwt } })
      .then(({ data }) => data.data);
  },
  fetchUserByUsername(username: string): Promise<User> {
    return axios
      .get(`http://localhost:8888/users/${username}`)
      .then(({ data }) => data.data);
  },
};
