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
TODO:
1. Change/Add user avatar (Add logic for change image btn on user's page)
2. Footer
3. !!!Clear image buffer for string[] and file[]
4?. Tap on image preview -> delete image from attachments. For this need to add key no MediaPreview.
5?. Сделать галочку для wwr канала и др больших
6.
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
        <Route path={redirectPaths.auth} component={(SignIn)} />
        <Route path={redirectPaths.private} component={(Private)} />
        <Route
          path={`${redirectPaths.user}/:username`}
          component={(PageScreen)}
        />
        <Route path="/" component={(HomeScreen)} />
      </Switch>
    </div>
  );
}

export default App;
