import React from "react";
import { useLocation } from "react-router-dom";
import { isHome } from "../../configs/redirect";
import { FetchScrolledHOC } from "../../services/controllers/FetchScrolledHOC";
import { fetchNews } from "../../store/ducks/news/actionCreators";
import Home from "./Home";

export const HomeScreen: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const HomeComponent = FetchScrolledHOC(Home, fetchNews, isHome(location.pathname));
  return <HomeComponent />;
};
