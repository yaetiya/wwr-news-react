import { News } from '../../news/typescript/state';

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

export interface OneNewsState {
  data: News | undefined;
  loadingState: LoadingState;
}
