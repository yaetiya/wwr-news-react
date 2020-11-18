import React from "react";
import { useLocation } from "react-router-dom";
import { redirectPaths } from "../../configs/redirect";
import { FetchScrolledHOC } from "../../services/controllers/FetchScrolledHOC";
import { fetchLeftNewsFromTag } from "../../store/ducks/news/actionCreators";
import { TagNews } from "./TagNews";

export const TagNewsComponent: React.FC = (): React.ReactElement => {
  const location = useLocation();
  const tag = location.pathname.split("/")[2];
  const isTags = location.pathname.split("/")[1] === redirectPaths.tag.slice(1);
  const TagNewsScreen = FetchScrolledHOC(TagNews, fetchLeftNewsFromTag, isTags, tag, tag);

  return <TagNewsScreen />;
};
