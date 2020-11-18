import { combineReducers } from 'redux';
import { newsReducer } from './ducks/news/reducer';
import { notificationsReducer } from './ducks/notifications/reducer';
import { oneNewsReducer } from './ducks/oneNews/reducer';
import { ReqUserReducer } from './ducks/reqUser/reducer';
import { tagsReducer } from './ducks/tags/reducer';
import { UserReducer } from './ducks/user/reducer';


export const rootReducer = combineReducers({
  news: newsReducer,
  tags: tagsReducer,
  oneNews: oneNewsReducer,
  user: UserReducer,
  reqUser: ReqUserReducer,
  notifications: notificationsReducer,
});
