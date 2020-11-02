import { combineReducers } from 'redux';
import { newsReducer } from './ducks/news/reducer';
import { oneNewsReducer } from './ducks/oneNews/reducer';
import { tagsReducer } from './ducks/tags/reducer';
import { UserReducer } from './ducks/user/reducer';


export const rootReducer = combineReducers({
  news: newsReducer,
  tags: tagsReducer,
  oneNews: oneNewsReducer,
  user: UserReducer
});
