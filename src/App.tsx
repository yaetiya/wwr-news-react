import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Private } from "./pages/Private/Private";
import { SignIn } from "./pages/Auth/Auth";
import { loadUserJWTData } from "./store/ducks/user/actionCreators";
import { ScrollTopBtn } from "./components/ScrollTopBtn";
import { Page } from "./pages/Page/Page";
import { fetchNotifications } from "./store/ducks/notifications/actionCreators";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications())
    dispatch(loadUserJWTData());
  }, [dispatch]);
  return (
    <div className="App">
      <ScrollTopBtn />

      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/private" component={Private} />
        <Route path="/user/:username" component={Page} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
