import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
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
import { defaultBackgroundColor } from "../../configs/palette";
import { selectIsNewsLoading } from "../../store/ducks/news/selectors";

export const Private: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsNewsLoading);
  const user = useSelector(selectUserData);
  const articles = useSelector(selectUserNews)?.reverse();

  const stylesPrivate = makeStyles((theme) => ({
    root: {
      position: "sticky",
      top: 50,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {},
    avatarCover: {
      background: user
        ? `url(${user.avatarUrl})`
        : theme.palette.background.default,
      width: "100%",
      paddingTop: "100%",
      backgroundSize: "cover",
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
    headImageWrapper: {
      width: "100%",
      paddingTop: "40%",
      position: "sticky",
      top: 60,
      background: user
        ? `url(${user.avatarUrl})`
        : theme.palette.background.default,
    },
    newslineWrapper: {
      background: defaultBackgroundColor,
      position: "relative",
    },
  }));

  const classes = stylesPrivate();
  useEffect(() => {
    dispatch(loadUserJWTData());
  }, [dispatch]);

  if (isLoading) {
    return <Redirect to="/signin" />;
  }
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  if (user) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <div className={classes.headImageWrapper}></div>
              <div className={classes.newslineWrapper}>
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
                        tags={item.tags}
                      />
                    ))
                  : null}
              </div>
            </Grid>
            <Grid item xs>
              <div className={classes.root}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div className={classes.details}>
                      <Typography component="h5" variant="h5">
                        @{user.username}
                      </Typography>
                      <br />
                      <Typography variant="subtitle1" color="textPrimary">
                        {user.fullname}
                      </Typography>
                      <div className={classes.content}>
                        <Counter value={10} text="Subscribers" />
                        <Counter value={22} text="Subscribes" />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs>
                    <div className={classes.avatarCover}></div>
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
