import React, { useEffect } from "react";
import {
  Container,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { Counter } from "../../components/Counter";
import Article from "../../components/Article/Article";
import { defaultBackgroundColor } from "../../configs/palette";
import {
  selectIsReqUserLoaded,
  selectReqUserData,
} from "../../store/ducks/reqUser/selectors";
import { fetchReqUserData } from "../../store/ducks/reqUser/actionCreators";
import { useParams } from "react-router-dom";

export const Page: React.FC = (): React.ReactElement => {
  const isLoaded = useSelector(selectIsReqUserLoaded);
  const user = useSelector(selectReqUserData);
  const params: { username?: string } = useParams();
  const username = params.username;
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(fetchReqUserData(username));
    }
  }, [username, dispatch]);
  if (user) {
    user.articles.reverse();
  }
  const stylesPage = makeStyles((theme) => ({
    root: {
      position: "sticky",
      top: 50,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
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
    headImageWrapper: {
      width: "100%",
      paddingTop: "40%",
      position: "sticky",
      top: 60,
      background: user
        ? `url(${user.avatarUrl})`
        : theme.palette.background.default,
    },
    avatarCover: {
      background: user
        ? `url(${user.avatarUrl})`
        : theme.palette.background.default,
      width: "100%",
      paddingTop: "100%",
      backgroundSize: "cover",
    },
    newslineWrapper: {
      paddingTop: 30,
      background: defaultBackgroundColor,
      position: "relative",
    },
  }));

  const classes = stylesPage();
  if (!isLoaded) {
    return <LinearProgress />;
  }
  if (!user) {
    return (
      <div>
        <Typography variant="h2">User does not exist</Typography>
      </div>
    );
  } else {
    /*
    для редиректа нужно делать 
        dispatch(setReqUserLoadingState(LoadingState.NEVER));
        (например в home)
    */
    // if (user._id === authUser?._id) {
    //   return <Redirect to="/private" />;
    // }
    return (
      <>
        <Navbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <div className={classes.headImageWrapper}></div>
              <div className={classes.newslineWrapper}>
                {user.articles
                  ? user.articles.map((item) => (
                      <Article
                        key={item._id}
                        id={item._id}
                        mainHeadline={
                          user.articles[0]._id !== item._id ? item.headline : ""
                        }
                        generalHeadline={
                          user.articles[0]._id === item._id ? item.headline : ""
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
                      <div>
                        <Counter number={100} text="Subscribers" />
                        <Counter number={204} text="Subscribes" />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs>
                    <div className={classes.avatarCover}></div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};
