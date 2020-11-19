import React, { useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { selectUserData } from "../../store/ducks/user/selectors";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserJWTData } from "../../store/ducks/user/actionCreators";
import Navbar from "../../components/Navbar";
import { NewPostForm } from "../../components/NewPostForm/NewPostForm";
import { defaultBackgroundColor } from "../../configs/palette";
import { selectIsNewsLoading } from "../../store/ducks/news/selectors";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";
import { redirectPaths } from "../../configs/redirect";

export const Private: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsNewsLoading);
  const user = useSelector(selectUserData);

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
    return <Redirect to={redirectPaths.auth} />;
  }
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
              </div>
            </Grid>
            <Grid item xs>
              <div className={classes.root}>
                <UserInfoCard isPrivate={true} />
              </div>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  return <Redirect to={redirectPaths.auth} />;
};
