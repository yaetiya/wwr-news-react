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
1. Сделать картинку, которая будет default avatar (Свою какую-то)
1.1. Сделать header Image (по аналогии с avatar image)
2. Footer
5?. Сделать галочку для wwr канала и др больших
6. Бек для найденных каналов итд 
(Концепт, что в одном поиске можно найти все) 
// https://www.youtube.com/watch?v=YaM0CaDTshc&ab_channel=Front-endSciencec%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%BC%D0%9F%D1%83%D0%B7%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D1%8B%D0%BC
7. Написать (скопировать) функцию,
 чтобы не плодить запросы к api (при наборе текста в поиске в навбаре)
8. Сделать нормальную верстку
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
