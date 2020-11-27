export enum SearchLoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface SearchChannelState {
  items: Channel[];
  loadingState: SearchLoadingState;
}

export interface Channel {
  name: string;
  avatarUrl?: string;
  link?: string;
  type: string;
}
