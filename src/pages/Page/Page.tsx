import React, { useEffect } from "react";
import {
  Button,
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
  selectIsReqUserError,
  selectIsReqUserLoaded,
  selectIsSubscribed,
  selectReqUserData,
} from "../../store/ducks/reqUser/selectors";
import {
  fetchReqUserData,
  fetchSubscribe,
  fetchUnsubscribe,
} from "../../store/ducks/reqUser/actionCreators";
import { useParams } from "react-router-dom";
import { selectIsUserLoaded, selectUserId } from "../../store/ducks/user/selectors";

export const Page: React.FC = (): React.ReactElement => {
  const isLoaded = useSelector(selectIsReqUserLoaded);
  const isError = useSelector(selectIsReqUserError);
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const loggedUserId = useSelector(selectUserId);
  const isSubscribed = useSelector(selectIsSubscribed);
  const user = useSelector(selectReqUserData);
  const params: { username?: string } = useParams();
  const username = params.username;
  const dispatch = useDispatch();
  useEffect(() => {
    if (username) {
      dispatch(fetchReqUserData(username));
    }
  }, [username, dispatch]);

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

  const unsubscribe = () => {
    if (user) {
      dispatch(fetchUnsubscribe(user?._id));
    }
  };
  const subscribe = () => {
    if (user) {
      dispatch(fetchSubscribe(user?._id));
    }
  };
  const classes = stylesPage();
  if (isError) {
    return (
      <div>
        <Typography variant="h5">User does not exist</Typography>
      </div>
    );
  }
  if (!isLoaded) {
    return <LinearProgress />;
  }
  if (user) {
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
                  ? user.articles.slice().reverse().map((item) => (
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
                      <div>
                        <Counter value={user.subscribers} text="Subscribers" />
                        <Counter
                          value={user.subscribtions}
                          text="Subscribtions"
                        />
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs>
                    <div className={classes.avatarCover}></div>
                    <br />
                    {(isLoggedIn && loggedUserId !== user._id) ? (
                      !isSubscribed ? (
                        <Button
                          onClick={subscribe}
                          fullWidth
                          variant="contained"
                          color="primary"
                        >
                          Subscribe
                        </Button>
                      ) : (
                        <Button
                          onClick={unsubscribe}
                          fullWidth
                          color="primary"
                          variant="outlined"
                        >
                          Unubscribe
                        </Button>
                      )
                    ) : null}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  return <div></div>;
};