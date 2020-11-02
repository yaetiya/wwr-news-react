import { User } from "../../user/typescript/state";

export enum LoadingState {
    LOADED = 'LOADED',
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
  }
  
  export enum AddFormState {
    LOADING = 'LOADING',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
    LOADED = 'LOADED'
  }

  export interface preNews {
    headline: string;
    text: string;
  }
  
  export interface News {
    _id: string;
    text: string;
    headline: string;
    watches: number;
    userId: User;
    date: string;
  }

export interface NewsState {
    items: News[];
    leftItems: News[];
    loadingState: LoadingState;
    addFormState: AddFormState;
    addNewsMessage: string;
  }
  