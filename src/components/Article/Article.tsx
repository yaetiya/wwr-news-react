import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  makeStyles,
  Snackbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  alertsStyle,
  defaultBackgroundColor,
  defaultTextColor,
  primaryColor,
  secondaryTextColor,
} from "../../configs/palette";
import { Link, useHistory } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";
import WatchesIcon from "@material-ui/icons/Visibility";
import { isMobile } from "../../configs/device";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAdmin, selectUserId } from "../../store/ducks/user/selectors";
import {
  deleteOneNewsData,
  setOneNewsLoadingState,
} from "../../store/ducks/oneNews/actionCreators";
import Alert from "@material-ui/lab/Alert";
import {
  selectIsOneNewsDeleted,
  selectIsOneNewsNotDeleted,
} from "../../store/ducks/oneNews/selectors";
import { LoadingState } from "../../store/ducks/oneNews/typescript/state";

export type articleProps = {
  isLast?: boolean;
  isSmall?: boolean;
  isFull?: boolean;
  generalHeadline?: string;
  mainHeadline?: string;
  secondaryHeadline?: string;
  text: string;
  watches: number;
  avatar: string;
  username: string;
  id: string;
  userId: string;
  date: string;
  tags: string[];
};
const Article = (articleProps: articleProps): React.ReactElement => {
  const postDate: Date = new Date(Date.parse(articleProps.date));
  const [openIsDeleted, setOpenIsDeleted] = useState<boolean>(false);
  const stylesHome = makeStyles(() => ({
    linkWrapper: {
      textDecoration: "none",
      color: "inherit",
    },
    articleWrapper: {
      backgroundColor: defaultBackgroundColor,
      marginBottom: 10,
      paddingBottom: 5,
      color: defaultTextColor,
      position: "relative",
      transition: "0.5s",
      "&:hover": {
        color: "#000",
      },
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "2px",
        display: "block",
        background: !articleProps.isLast ? primaryColor : "",
      },
    },

    generalHeadline: {
      fontFamily: "Oswald",
      fontSize: 32,
    },
    mainHeadline: {
      fontFamily: "Oswald",
      fontSize: articleProps?.isSmall ? 20 : 28,
    },
    secondaryHeadline: {
      fontSize: articleProps?.isSmall ? 16 : 24,
      fontWeight: 500,
    },
    paragraph: {
      paddingTop: 4,
      fontSize: 14,
      fontWeight: 400,
      whiteSpace: "pre-line",
      // fontFamily: "Oswald",
    },
    tagsWrapper: {
      display: "flex",
      color: secondaryTextColor,
    },
    infoBottomWrapper: {
      justifyContent: "space-between",
      display: "flex",
    },
    watchesWrapper: {
      color: secondaryTextColor,
      display: "flex",
    },
    watchesText: {
      textAlign: "right",
      fontSize: 14,
      width: "100%",
    },
    watchedIcon: {
      marginLeft: 5,
      marginTop: 4,
      width: 14,
      height: 14,
    },
    userWrapper: {
      justifyContent: "space-between",
      display: "flex",
    },
    deleteBtn: {
      height: 14,
    },
    userText: {
      fontSize: 14,
    },
    userImage: {
      display: articleProps?.isSmall ? "none" : "flex",
      marginTop: articleProps.generalHeadline ? 32 : 29,
      float: "right",
      marginRight: 10,
      height: articleProps.generalHeadline ? 34 : 30,
      width: articleProps.generalHeadline ? 34 : 30,
    },
    "@media (max-width: 900px)": {
      userImage: {
        float: "left",
        marginBottom: 10,
      },
    },
  }));
  const classes = stylesHome();
  const userId = useSelector(selectUserId);
  const isDeleted = useSelector(selectIsOneNewsDeleted);
  const isNotDeleted = useSelector(selectIsOneNewsNotDeleted);
  const isAdminLogged = useSelector(selectIsAdmin);
  const history = useHistory();
  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteOneNewsData(articleProps.id));
  };
  useEffect(() => {
    if (isDeleted || isNotDeleted) {
      setOpenIsDeleted(true);
      setTimeout(() => {
        setOpenIsDeleted(false);
        dispatch(setOneNewsLoadingState(LoadingState.NEVER));
      }, 800);
    }
  }, [dispatch, history, isDeleted, isNotDeleted]);
  const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenIsDeleted(false);
  };

  return (
    <>
      <Snackbar
        open={openIsDeleted}
        autoHideDuration={700}
        onClose={handleClose}
      >
        <Alert
          style={alertsStyle(!!isDeleted)}
          onClose={handleClose}
          severity={!!isNotDeleted ? "error" : "success"}
        >
          {isDeleted ? "You have deleted this news" : "Something goes wrong"}
        </Alert>
      </Snackbar>
      <Grid container spacing={0}>
        <Grid xs item>
          <Avatar
            variant="rounded"
            alt="Avatar"
            className={classes.userImage}
            src={articleProps.avatar}
          />
        </Grid>
        <Grid xs={isMobile ? 12 : 11} item>
          <div className={classes.articleWrapper}>
            <div className={classes.userWrapper}>
              <Link
                className={classes.linkWrapper}
                to={`/user/${articleProps.username}`}
              >
                <Typography className={classes.userText}>
                  @{articleProps.username + " "}
                  {articleProps?.isSmall ? null : postDate.toLocaleString()}
                </Typography>
              </Link>

              {articleProps.isFull &&
              (articleProps.userId === userId || isAdminLogged) ? (
                <Button
                  className={classes.deleteBtn}
                  style={isDeleted ? { color: primaryColor } : undefined}
                  disableRipple
                  onClick={deleteHandler}
                >
                  {!isDeleted ? "Delete" : "Was deleted"}
                </Button>
              ) : null}
            </div>
            {!articleProps.isFull ? (
              <Link
                className={classes.linkWrapper}
                to={`/oneNews/${articleProps.id}`}
              >
                <ArticleBody articleProps={articleProps} classes={classes} />
              </Link>
            ) : (
              <ArticleBody articleProps={articleProps} classes={classes} />
            )}
            <div className={classes.infoBottomWrapper}>
              <div className={classes.tagsWrapper}>
                {articleProps.tags.slice(0, 3).map((tag) => (
                  <Link to={`/tag/${tag}`} className={classes.linkWrapper}>
                    <Typography variant="caption" style={{ marginRight: 5 }}>
                      #{tag}
                    </Typography>
                  </Link>
                ))}
              </div>
              <div className={classes.watchesWrapper}>
                <Typography className={classes.watchesText}>
                  {articleProps.watches}
                </Typography>
                <WatchesIcon className={classes.watchedIcon} />
              </div>
            </div>
            {articleProps.isLast ? (
              <div>
                <LinearProgress style={{ height: 2 }} />
              </div>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Article;
