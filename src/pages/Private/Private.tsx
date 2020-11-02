import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  selectIsUserLoaded,
  selectUserData,
  selectUserNews,
} from "../../store/ducks/user/selectors";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUserJWTData,
  logoutUser,
} from "../../store/ducks/user/actionCreators";
import Navbar from "../../components/Navbar";
import { NewPostForm } from "../../components/NewPostForm";
import { Counter } from "../../components/Counter";
import Article from "../../components/Article/Article";

const stylesPrivate = makeStyles((theme) => ({
  root: {
    paddingTop: 50,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {},
  cover: {
    width: "100%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export const Private: React.FC = (): React.ReactElement => {
  const classes = stylesPrivate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const user = useSelector(selectUserData);
  const articles = useSelector(selectUserNews);

  /*
  TODO:
  This is private cabinet only page
  Need to decompose this to semple stupid components
  
  In "User page" i will use this components too.
  */

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loadUserJWTData());
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn) {
    return <Redirect to="/signin" />;
  }
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  if (user) {
    return (
      <>
        <Navbar {...{ isLoggedIn }} username={user.username} />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <NewPostForm />
              {articles
                ? articles.map((item) => (
                    <Article
                      key={item._id}
                      id={item._id}
                      mainHeadline={
                        articles[0]._id !== item._id ? item.headline : ""
                      }
                      generalHeadline={
                        articles[0]._id === item._id ? item.headline : ""
                      }
                      text={item.text}
                      watches={item.watches}
                      avatar={user.avatarUrl}
                      username={user.username}
                      date={item.date}
                      userId={user._id}
                    />
                  ))
                : null}
            </Grid>
            <Grid item xs>
              <div className={classes.root}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className={classes.details}>
                      <Typography component="h5" variant="h5">
                        @{user.username}
                      </Typography>
                      <Typography variant="subtitle1" color="textPrimary">
                        {user.fullname}
                      </Typography>
                      <div className={classes.content}>
                        <Counter number={10} text="Subscribers" />
                        <Counter number={22} text="Subscribes" />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs>
                    <img
                      className={classes.cover}
                      src={user.avatarUrl}
                      alt="avatar"
                    />
                    <Button onClick={logoutHandler} fullWidth>
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  return <Redirect to="/signin" />;
};
