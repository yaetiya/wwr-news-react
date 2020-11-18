import {
  LinearProgress,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useLocation } from "react-router-dom";
import Article from "../../components/Article/Article";
import Navbar from "../../components/Navbar";
import { NewPostForm } from "../../components/NewPostForm";
import { OneArticle } from "./OneArticle";
import { defaultBackgroundColor, primaryColor } from "../../configs/palette";
import { fetchLeftNews } from "../../store/ducks/news/actionCreators";
import {
  selectIsNewsLoaded,
  selectIsNewsLoading,
  selectLeftNewsItems,
  selectNewsItems,
} from "../../store/ducks/news/selectors";

import { SideBar } from "./SideBar";
import { NotificationHub } from "../../components/NotificationsHub/NotificationsHub";
import { isHome, redirectPaths } from "../../configs/redirect";
import { TagNewsComponent } from "./TagNewsComponent";
import { isMobile } from "../../configs/device";

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
  const leftNews = useSelector(selectLeftNewsItems);
  const isLoading = useSelector(selectIsNewsLoading);
  const classes = stylesHome();
  const location = useLocation();

  useEffect(() => {
    if (leftNews.length === 0 && isHome(location.pathname) && !isMobile) {
      dispatch(fetchLeftNews());
    }
  }, [dispatch, leftNews.length, location.pathname]);

  return (
    <>
      <Navbar />
      <NotificationHub />
      <Container maxWidth="md" className={classes.root}>
        <NewPostForm />
        <SideBar />
        <div className={classes.ArticlesWrapper}>
          <Grid container spacing={3}>
            <Grid item xs={!isMobile ? 4 : undefined}>
              <Route path={[redirectPaths.home, "/"]} exact>
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
            <Grid item xs={!isMobile ? 8 : 12}>
              <Route path={[redirectPaths.home, "/"]} exact>
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

          <Route path={`${redirectPaths.oneNews}/:id`}>
            <Container maxWidth="md">
              <div className={classes.ArticlesWrapper}>
                <OneArticle />
              </div>
            </Container>
          </Route>
          <Route path={`${redirectPaths.tag}/:name`}>
            <Container maxWidth="md">
              <div className={classes.ArticlesWrapper}>
                <TagNewsComponent />
              </div>
            </Container>
          </Route>
        </div>
      </Container>
    </>
  );
};

export default Home;
