import {
  Grid,
  Typography,
  Button,
  makeStyles,
  LinearProgress,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isMobile } from "../../configs/device";
import { defaultBackgroundColor } from "../../configs/palette";
import { redirectPaths } from "../../configs/redirect";
import {
  fetchUnsubscribe,
  fetchSubscribe,
} from "../../store/ducks/reqUser/actionCreators";
import {
  selectIsSubscribed,
  selectReqUserData,
} from "../../store/ducks/reqUser/selectors";
import {
  selectIsUserLoaded,
  selectUserData,
  selectUserId,
} from "../../store/ducks/user/selectors";
import { Counter } from "../Counter";
import { ActionButtons } from "./ActionButtons";

export const UserInfoCard = ({ isPrivate }: { isPrivate: boolean }) => {
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const loggedUserId = useSelector(selectUserId);
  const isSubscribed = useSelector(selectIsSubscribed);
  const loggedUser = useSelector(selectUserData);
  const reqUser = useSelector(selectReqUserData);
  let user = isPrivate ? loggedUser : reqUser;

  const dispatch = useDispatch();
  const stylesCard = makeStyles((theme) => ({
    root: {
      position: isMobile ? "relative" : "sticky",
      top: 50,
      paddingBottom: 20,
      backgroundColor: defaultBackgroundColor,
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
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
  }));
  const classes = stylesCard();
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

  if (user) {
    return (
      <div className={classes.root}>
        <Link
          to={`${redirectPaths.user}/${user.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography variant="h5">@{user.username}</Typography>
        </Link>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className={classes.details}>
              <Typography variant="subtitle1" color="textPrimary">
                {user.fullname}
              </Typography>
              <div>
                <Counter value={user.subscribers} text="Subscribers" />
                <Counter value={user.subscriptions} text="Subscribtions" />
              </div>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.avatarCover}></div>
            <br />
            {isPrivate && !isMobile ? (
              <ActionButtons />
            ) : isLoggedIn && loggedUserId !== user._id ? (
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
                  Unsubscribe
                </Button>
              )
            ) : null}
          </Grid>
        </Grid>
        {isPrivate && isMobile ? <ActionButtons /> : null}
      </div>
    );
  }
  return <LinearProgress />;
};
