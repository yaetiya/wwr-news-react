import {
  LinearProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import Article from "../../components/Article/Article";
import Navbar from "../../components/Navbar";
import { NewPostForm } from "../../components/NewPostForm";
import { OneArticle } from "./OneArticle";
import { defaultBackgroundColor, primaryColor } from "../../configs/palette";
import {
  fetchLeftNews,
  fetchNews,
  resetNews,
  setFetchedNewsPage,
} from "../../store/ducks/news/actionCreators";
import {
  selectIsNewsLoaded,
  selectIsNewsLoading,
  selectLeftNewsItems,
  selectNewsItems,
} from "../../store/ducks/news/selectors";
import { fetchTags } from "../../store/ducks/tags/actionCreators";

import { SideBar } from "./SideBar";
import { NotificationHub } from "../../components/NotificationsHub/NotificationsHub";
import { selectJWT } from "../../store/ducks/user/selectors";
import { TagNews } from "./TagNews";

const stylesHome = makeStyles(() => ({
  root: {
    backgroundColor: defaultBackgroundColor,
  },

  ArticlesWrapper: {
    position: "sticky",
    top: 80,
    backgroundColor: defaultBackgroundColor,
  },
  footerWrapper: {
    height: 300,
    backgroundColor: primaryColor,
  },
}));

const Home: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const news = useSelector(selectNewsItems);
  const isLoaded = useSelector(selectIsNewsLoaded);
  const jwt = useSelector(selectJWT);
  const leftNews = useSelector(selectLeftNewsItems);
  const isLoading = useSelector(selectIsNewsLoading);

  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const classes = stylesHome();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTags());
    if (location.pathname.split("/")[1] === "home") {
      dispatch(fetchLeftNews());
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (jwt) {
      dispatch(setFetchedNewsPage(0));
      dispatch(fetchNews());
    } else {
      dispatch(resetNews(leftNews));
    }
  }, [dispatch, jwt, leftNews]);

  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > scrollPosition) {
      setSrollPosition(Math.round(position - (position % 100)));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (
      windowHeight > 100 &&
      windowHeight - scrollPosition < 100 &&
      windowHeight - scrollPosition > 0 &&
      location.pathname.split("/")[1] === "home"
    ) {
      dispatch(fetchNews());
    }
  }, [dispatch, scrollPosition, windowHeight, location]);

  return (
    <>
      <Navbar />
      <NotificationHub />
      <Container maxWidth="md" className={classes.root}>
        <NewPostForm />
        <SideBar />
        <div className={classes.ArticlesWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Route path="/home" exact>
                <div className={classes.ArticlesWrapper}>
                  {isLoading && leftNews.length === 0 ? (
                    <div></div>
                  ) : (
                    leftNews
                      .slice(0, 3)
                      .map((oneNews) => (
                        <Article
                          isSmall
                          key={oneNews._id}
                          id={oneNews._id}
                          secondaryHeadline={oneNews.headline}
                          text={oneNews.text}
                          watches={oneNews.watches}
                          avatar={oneNews.userId.avatarUrl}
                          username={oneNews.userId.username}
                          date={oneNews.date}
                          userId={oneNews.userId._id}
                          tags={oneNews.tags}
                        />
                      ))
                  )}
                </div>
              </Route>
            </Grid>
            <Grid item xs={8}>
              <Route path="/home" exact>
                <div className={classes.ArticlesWrapper}>
                  {isLoading && news.length === 0 ? (
                    <div>
                      <LinearProgress />
                    </div>
                  ) : isLoaded && news.length === 0 ? (
                    <div>
                      <Typography>No news</Typography>
                    </div>
                  ) : (
                    news.map((oneNews) => (
                      <Article
                        isLast={
                          isLoading && oneNews._id === news[news.length - 1]._id
                        }
                        key={oneNews._id}
                        id={oneNews._id}
                        mainHeadline={
                          news[0]._id !== oneNews._id ? oneNews.headline : ""
                        }
                        generalHeadline={
                          news[0]._id === oneNews._id ? oneNews.headline : ""
                        }
                        text={oneNews.text}
                        watches={oneNews.watches}
                        avatar={oneNews.userId.avatarUrl}
                        username={oneNews.userId.username}
                        date={oneNews.date}
                        userId={oneNews.userId._id}
                        tags={oneNews.tags}
                      />
                    ))
                  )}
                </div>
              </Route>
            </Grid>
          </Grid>

          <Route path="/trends" exact>
            <Container maxWidth="md">
              <div className={classes.ArticlesWrapper}>
                {isLoading && leftNews.length === 0 ? (
                  <div>
                    <LinearProgress />
                  </div>
                ) : (
                  leftNews.map((oneNews) => (
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
                  ))
                )}
              </div>
            </Container>
          </Route>

          <Route path="/oneNews/:id">
            <Container maxWidth="md">
              <div className={classes.ArticlesWrapper}>
                <OneArticle />
              </div>
            </Container>
          </Route>
          <Route path="/tag/:name">
            <Container maxWidth="md">
              <div className={classes.ArticlesWrapper}>
                <TagNews />
              </div>
            </Container>
          </Route>
        </div>
      </Container>
    </>
  );
};

export default Home;
