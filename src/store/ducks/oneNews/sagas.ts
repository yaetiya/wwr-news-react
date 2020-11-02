import { call, put, takeEvery } from 'redux-saga/effects';
import { NewsApi } from '../../../services/api/newsApi';
import { News } from '../news/typescript/state';
import { setOneNewsData, setOneNewsLoadingState } from './actionCreators';
import { FetchOneNewsDataActionInterface, OneNewsActionsType } from './typescript/actionTypes';
import { LoadingState } from './typescript/state';

export function* fetchOneNewsDataRequest({ payload: tweetId }: FetchOneNewsDataActionInterface) {
  try {
    const data: News = yield call(NewsApi.fetchOneNewsData, tweetId);
    yield put(setOneNewsData(data));
  } catch (error) {
    yield put(setOneNewsLoadingState(LoadingState.ERROR));
  }
}

export function* oneNewsSaga() {
  yield takeEvery(OneNewsActionsType.FETCH_ONE_NEWS_DATA, fetchOneNewsDataRequest);
}
