import { call, put, takeLatest } from "redux-saga/effects";
import { searchChannelsAPI } from "../../../services/api/searchChannels";
import { setChannels, setLoadingState } from "./actionCreators";
import {
  FetchChennelsActionInterface,
  SearchChannelActionsType,
} from "./typescript/actionTypes";
import { SearchLoadingState } from "./typescript/state";

export function* fetchChannelsRequest({
  payload,
}: FetchChennelsActionInterface) {
  try {
    let channels = [];
    if (payload) {
      channels = yield call(searchChannelsAPI.fetchChannels, payload);
    }
    if (channels) {
      yield put(setChannels(channels));
      yield put(setLoadingState(SearchLoadingState.LOADED));
    }
  } catch (error) {
    yield put(setLoadingState(SearchLoadingState.ERROR));
  }
}

export function* searchChannelsSaga() {
  yield takeLatest(
    SearchChannelActionsType.FETCH_CHANNELS,
    fetchChannelsRequest
  );
}
