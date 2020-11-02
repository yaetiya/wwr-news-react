import { LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchOneNewsData,
} from "../../store/ducks/oneNews/actionCreators";
import { selectOneNewsData } from "../../store/ducks/oneNews/selectors";
import Article from "./Article";

export const OneArticle = () => {
  const params: { id?: string } = useParams();
  const oneNews = useSelector(selectOneNewsData);
  const id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNewsData(id));
    }
  }, [dispatch, id]);
  if (oneNews) {
    return (
      <Article
        isFull
        key={oneNews._id}
        id={oneNews._id}
        generalHeadline={oneNews?.headline}
        text={oneNews.text}
        watches={oneNews.watches}
        avatar={oneNews.userId.avatarUrl}
        username={oneNews.userId.username}
        date={oneNews.date}
        userId={oneNews.userId._id}
      />
    );
  } else {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }
};
