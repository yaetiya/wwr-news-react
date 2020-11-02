import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import { Private } from "./pages/Private/Private";
import { SignIn } from "./pages/Auth/Auth";
import { loadUserJWTData } from "./store/ducks/user/actionCreators";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserJWTData());
  }, [dispatch])
  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/private" component={Private} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
