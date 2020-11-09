import { Grid, LinearProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneNewsData } from "../../store/ducks/oneNews/actionCreators";
import {
  selectComments,
  selectOneNewsData,
} from "../../store/ducks/oneNews/selectors";
import Article from "../../components/Article/Article";
import Comment from "../../components/Comment/Comment";
import { NewCommentForm } from "../../components/Comment/AddCommentForm";
import { Footer } from "./Footer";

export const OneArticle = () => {
  const params: { id?: string } = useParams();
  const oneNews = useSelector(selectOneNewsData);
  const id = params.id;
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneNewsData(id));
    }
  }, [dispatch, id]);
  if (oneNews) {
    return (
      <>
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
          tags={oneNews.tags}
        />
        <NewCommentForm />

        {comments
          ? comments.map((comment) => (
              <Grid container spacing={0}>
                <Grid item xs={1}></Grid>
                <Grid item xs>
                  <Comment
                    text={comment.text}
                    date={new Date(Date.parse(comment.date)).toLocaleString()}
                    username={comment.userId.username}
                    avatar={comment.userId.avatarUrl}
                  />
                </Grid>
              </Grid>
            ))
          : null}
        <Footer />
      </>
    );
  } else {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }
};
