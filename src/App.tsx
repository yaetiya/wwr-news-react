import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Private } from "./pages/Private/Private";
import { SignIn } from "./pages/Auth/Auth";
import { ScrollTopBtn } from "./components/ScrollTopBtn";
import { fetchNotifications } from "./store/ducks/notifications/actionCreators";
import { fetchTags } from "./store/ducks/tags/actionCreators";
import { HomeScreen } from "./pages/Home/HomeScreen";
import { PageScreen } from "./pages/Page/PageScreen";
import { fetchNews } from "./store/ducks/news/actionCreators";
import { redirectPaths } from "./configs/redirect";

/*
1. Change/Add user avatar
2. Extract header image (dublicate avatarUrl to headerUrl)
3. Add an oportunity to delete a post for user
---------
Back:
Now images are saving on mem-ry
Front:
Not u can upload only one image (because lib(...)
does not clear choosen images state (need to write custom useState and crear
this from the parent (newPostForm))
when the post was successfully uploaded)
TODO:
Display images with post
Add logic for change image btn on user's page
*/

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchNotifications());
    dispatch(fetchNews());
  }, [dispatch]);
  return (
    <div className="App">
      <ScrollTopBtn />
      <Switch>
        <Route path={redirectPaths.auth} component={SignIn} />
        <Route path={redirectPaths.private} component={Private} />
        <Route path={`${redirectPaths.user}/:username`} component={PageScreen} />
        <Route path="/" component={HomeScreen} />
      </Switch>
    </div>
  );
}

export default App;
