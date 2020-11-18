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
import Article from "../../components/Article/Article";
import { defaultBackgroundColor } from "../../configs/palette";
import {
  selectIsReqUserError,
  selectIsReqUserLoaded,
  selectReqUserData,
} from "../../store/ducks/reqUser/selectors";
import { fetchReqUserData } from "../../store/ducks/reqUser/actionCreators";
import { useParams } from "react-router-dom";
import { UserInfoCard } from "../../components/UserInfoCard";
import { NewPostForm } from "../../components/NewPostForm";
import { selectUserId } from "../../store/ducks/user/selectors";
import { isMobile } from "../../configs/device";

export const Page: React.FC = (): React.ReactElement => {
  const isLoaded = useSelector(selectIsReqUserLoaded);
  const isError = useSelector(selectIsReqUserError);
  const loggedUserId = useSelector(selectUserId);
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
    root: isMobile
      ? {
          position: "fixed",
          top: 50,
          right: 38,
        }
      : { position: "sticky", top: 50 },
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
      width: "99%",
      marginLeft: 2,
      marginRight: 2,
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
    "@media (max-width: 450px)": {
      root: {
        position: "relative",
        top: 0,
        left: 0,
      },
    },
  }));

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
    return (
      <>
        <Navbar />
        <Container maxWidth="lg">
          {isMobile ? (
            <div className={classes.root}>
              <UserInfoCard isPrivate={false} />
            </div>
          ) : null}
          <Grid container spacing={3}>
            <Grid item xs={!isMobile ? 8 : 12}>
              <div className={classes.headImageWrapper}></div>
              <div className={classes.newslineWrapper}>
                {loggedUserId === user._id ? <NewPostForm /> : null}
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
                        tags={item.tags}
                      />
                    ))
                  : null}
              </div>
            </Grid>
            <Grid item xs>
              {!isMobile ? (
                <div className={classes.root}>
                  <UserInfoCard isPrivate={false} />
                </div>
              ) : null}
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  return <div></div>;
};
