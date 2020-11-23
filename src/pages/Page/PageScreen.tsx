import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { isPage } from "../../configs/redirect";
import { FetchScrolledHOC } from "../../services/controllers/FetchScrolledHOC";
import { LoaderHOC } from "../../services/controllers/LoaderHOC";
import { FetchReqUserPostsData } from "../../store/ducks/reqUser/actionCreators";
import { selectIsReqUserLoaded } from "../../store/ducks/reqUser/selectors";
import { Page } from "./Page";

export const PageScreen: React.FC = (): React.ReactElement => {
  const isReqUserLoaded = useSelector(selectIsReqUserLoaded);
  const location = useLocation();

  const PageComponent = LoaderHOC()(FetchScrolledHOC(
    Page,
    FetchReqUserPostsData,
    isPage(location.pathname),
    isReqUserLoaded
  ));
  return <PageComponent />;
};
