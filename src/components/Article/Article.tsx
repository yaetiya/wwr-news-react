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
  secondaryBackgroundColor,
  secondaryTextColor,
} from "../../configs/palette";
import { Link } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";

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
        background: !articleProps.isLast ? secondaryBackgroundColor : "",
      },
    },

    generalHeadline: {
      fontFamily: "Oswald",
      fontSize: 36,
    },
    mainHeadline: {
      fontFamily: "Oswald",
      fontSize: articleProps?.isSmall ? 20 : 28,
    },
    secondaryHeadline: {
      fontSize: articleProps?.isSmall ? 18 : 20,
      // fontWeight: "bold",
    },
    paragraph: {
      paddingTop: 0,
      fontSize: 14,
      fontWeight: 400,
      // fontFamily: "Oswald",
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
    "@media (max-width: 624px)": {
      articleWrapper: {
        display: articleProps.isSmall ? "none" : "block",
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
      <Grid xs={11} item>
        <div className={classes.articleWrapper}>
          <Link
            className={classes.linkWrapper}
            to={`/user/${articleProps.username}`}
          >
            <div className={classes.userWrapper}>
              <Typography className={classes.userText}>
                @{articleProps.username}{" "}
                {articleProps?.isSmall ? null : postDate.toTimeString()}
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
