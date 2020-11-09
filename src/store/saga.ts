import { all } from "redux-saga/effects";

import { newsSaga } from "./ducks/news/sagas";
import { notificationsSaga } from "./ducks/notifications/sagas";
import { oneNewsSaga } from "./ducks/oneNews/sagas";
import { ReqUserSaga } from "./ducks/reqUser/sagas";
import { tagsSaga } from "./ducks/tags/sagas";
import { UserSaga } from "./ducks/user/sagas";

export default function* rootSaga() {
  yield all([
    newsSaga(),
    tagsSaga(),
    oneNewsSaga(),
    UserSaga(),
    ReqUserSaga(),
    notificationsSaga(),
  ]);
}
