import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { NewsState } from './ducks/news/typescript/state';
import { OneNewsState } from './ducks/oneNews/typescript/state';
import { TagsState } from './ducks/tags/typescript/state';
import { UserState } from './ducks/user/typescript/state';


import { rootReducer } from './rootReducer';
import rootSaga from './saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  oneNews: OneNewsState;
  news: NewsState;
  tags: TagsState;
  user: UserState;
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
