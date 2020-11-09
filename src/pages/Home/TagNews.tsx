import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Article from "../../components/Article/Article";
import {
  fetchLeftNewsFromTag,
  setLeftNews,
} from "../../store/ducks/news/actionCreators";
import { selectLeftNewsItems } from "../../store/ducks/news/selectors";

export const TagNews = () => {
  const params: { name?: string } = useParams();
  const leftNews = useSelector(selectLeftNewsItems);
  const name = params.name;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLeftNews([]));
    if (name) {
      dispatch(fetchLeftNewsFromTag(name));
    }
  }, [dispatch, name]);
  if (leftNews.length !== 0) {
    return (
      <>
        {leftNews.map((oneNews) => (
          <Article
            key={oneNews._id}
            id={oneNews._id}
            mainHeadline={
              leftNews[0]._id !== oneNews._id ? oneNews.headline : ""
            }
            generalHeadline={
              leftNews[0]._id === oneNews._id ? oneNews.headline : ""
            }
            text={oneNews.text}
            watches={oneNews.watches}
            avatar={oneNews.userId.avatarUrl}
            username={oneNews.userId.username}
            date={oneNews.date}
            userId={oneNews.userId._id}
            tags={oneNews.tags}
          />
        ))}
      </>
    );
  }
  return (
    <div>
      <LinearProgress />
    </div>
  );
};
