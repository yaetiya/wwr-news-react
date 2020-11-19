import { News } from '../../news/typescript/state';

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
  DELETED = 'DELETED',
  NOT_DELETED = 'NOT_DELETED'
}
export interface TPreComment {
  text: string;
  postId: string;
}

export interface OneNewsState {
  data: News | undefined;
  loadingState: LoadingState;
  addCommentErrorMessage: string | undefined;
}
