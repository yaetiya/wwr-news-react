import {
  Avatar,
  Grid,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import {
  defaultBackgroundColor,
  defaultTextColor,
  primaryColor,
  secondaryTextColor,
} from "../../configs/palette";
import { Link } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";
import WatchesIcon from "@material-ui/icons/Visibility";
import { isMobile } from "../../configs/device";

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
      fontSize: 34,
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
      display: "flex",
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

  return (
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
          <Link
            className={classes.linkWrapper}
            to={`/user/${articleProps.username}`}
          >
            <div className={classes.userWrapper}>
              <Typography className={classes.userText}>
                @{articleProps.username + " "}
                {articleProps?.isSmall ? null : postDate.toLocaleString()}
              </Typography>
            </div>
          </Link>
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
                  <Typography variant="body2" style={{ marginRight: 5 }}>
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
  );
};

export default Article;
