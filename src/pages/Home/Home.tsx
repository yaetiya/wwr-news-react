import {
  Button,
  LinearProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, useLocation } from "react-router-dom";
import Article from "../../components/Article/Article";
import Navbar from "../../components/Navbar";
import { NewPostForm } from "../../components/NewPostForm";
import { OneArticle } from "../../components/Article/OneArticle";
import {
  defaultBackgroundColor,
  secondaryBackgroundColor,
} from "../../configs/palette";
import { fetchLeftNews, fetchNews } from "../../store/ducks/news/actionCreators";
import {
  selectIsNewsLoading,
  selectLeftNewsItems,
  selectNewsItems,
} from "../../store/ducks/news/selectors";
import { fetchTags } from "../../store/ducks/tags/actionCreators";
import {
  selectIsTagsLoaded,
  selectTagsItems,
} from "../../store/ducks/tags/selectors";
import {
  selectIsUserLoaded,
  selectUsernameData,
} from "../../store/ducks/user/selectors";

const stylesHome = makeStyles(() => ({
  root: {
    paddingLeft: 40,
    paddingRight: 40,
    width: "100%",
    height: "100%",
    backgroundColor: defaultBackgroundColor,
  },

  ArticlesWrapper: {
    position: "sticky",
    top: 80,
    backgroundColor: defaultBackgroundColor,
  },

  sideWrapper: {
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    paddingTop: 40,
    position: "sticky",
    top: 0,
  },

  buttonSideBlock: {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "0.2rem",
      display: "block",
      background: secondaryBackgroundColor,
    },
  },
}));

const Home: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const news = useSelector(selectNewsItems);
  const leftNews = useSelector(selectLeftNewsItems);
  const tags = useSelector(selectTagsItems);
  const isTagsLoaded = useSelector(selectIsTagsLoaded);
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const username = useSelector(selectUsernameData);
  const isLoading = useSelector(selectIsNewsLoading);

  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const classes = stylesHome();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchNews());
    dispatch(fetchLeftNews());
  }, [dispatch]);

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
    <div className={classes.root}>
      <Navbar {...{isLoggedIn, username}}/>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs>
            <NewPostForm />
            <div className={classes.ArticlesWrapper}>
              <Grid container spacing={8}>
                <Grid item xs={3}>
                  <Route path="/home" exact>
                    <div className={classes.ArticlesWrapper}>
                      {isLoading && leftNews.length === 0 ? (
                        <div></div>
                      ) : (
                        leftNews.map((oneNews) => (
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
                          />
                        ))
                      )}
                    </div>
                  </Route>
                </Grid>
                <Grid item xs={9}>
                  <Route path="/home" exact>
                    <div className={classes.ArticlesWrapper}>
                      {isLoading && news.length === 0 ? (
                        <div>
                          <LinearProgress />
                        </div>
                      ) : (
                        news.map((oneNews) => (
                          <Article
                            isLast={(isLoading && (oneNews._id === news[news.length-1]._id))}
                            key={oneNews._id}
                            id={oneNews._id}
                            mainHeadline={
                              news[0]._id !== oneNews._id
                                ? oneNews.headline
                                : ""
                            }
                            generalHeadline={
                              news[0]._id === oneNews._id
                                ? oneNews.headline
                                : ""
                            }
                            text={oneNews.text}
                            watches={oneNews.watches}
                            avatar={oneNews.userId.avatarUrl}
                            username={oneNews.userId.username}
                            date={oneNews.date}
                            userId={oneNews.userId._id}
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
                            leftNews[0]._id !== oneNews._id
                              ? oneNews.headline
                              : ""
                          }
                          generalHeadline={
                            leftNews[0]._id === oneNews._id
                              ? oneNews.headline
                              : ""
                          }
                          text={oneNews.text}
                          watches={oneNews.watches}
                          avatar={oneNews.userId.avatarUrl}
                          username={oneNews.userId.username}
                          date={oneNews.date}
                          userId={oneNews.userId._id}
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
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.sideWrapper}>
              <div className={classes.buttonSideBlock}>
                <Link to="/home">
                  <Button>Home</Button>
                </Link>
                <Link to="/trends">
                  <Button>Trends</Button>
                </Link>
              </div>
              <div className={classes.buttonSideBlock}>
                {isTagsLoaded
                  ? tags.map((tag) => (
                      <Link to={`/tag/${tag._id}`}>
                        <Button>{tag.name}</Button>
                      </Link>
                    ))
                  : null}
              </div>
              <div className={classes.buttonSideBlock}>
                <Link to="/settings">
                  <Button>Settings</Button>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
