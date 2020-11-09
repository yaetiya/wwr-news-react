import { User } from "../../user/typescript/state";

export enum LoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export enum AddFormState {
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
  LOADED = "LOADED",
}

export interface preNews {
  headline: string;
  text: string;
}

export interface TComment {
  date: string;
  text: string;
  userId: User;
}

export interface fetchNewsInterface{
  page: number;
}

export interface News {
  _id: string;
  text: string;
  headline: string;
  watches: number;
  userId: User;
  date: string;
  commentsId: TComment[];
  tags: string[];
}

export interface NewsState {
  items: News[];
  leftItems: News[];
  loadingState: LoadingState;
  addFormState: AddFormState;
  addNewsMessage: string;
  fetchedNewsPage: number;
}
