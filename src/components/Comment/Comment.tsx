import {
  Avatar,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import {
  defaultBackgroundColor,
  defaultTextColor,
  secondaryTextColor,
} from "../../configs/palette";

export type CommentProps = {
  text: string;
  avatar: string;
  username: string;
  date: string;
};
const Comment = (commentProps: CommentProps): React.ReactElement => {
  const stylesComment = makeStyles(() => ({
    linkWrapper: {
      textDecoration: "none",
      color: "inherit",
    },
    articleWrapper: {
      backgroundColor: defaultBackgroundColor,
      marginBottom: 15,
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
        height: "1px",
        display: "block",
        background: secondaryTextColor,
      },
    },

    paragraph: {
      paddingTop: 10,
      fontSize: 14,
      fontWeight: 500,
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
      display: "flex",
      float: "right",
      marginRight: 10,
      height: 30,
      width: 30,
    },
  }));
  const classes = stylesComment();

  return (
    <Grid container spacing={0}>
      <Grid xs item>
        <Avatar
          variant="rounded"
          alt="Avatar"
          className={classes.userImage}
          src={commentProps.avatar}
        />
      </Grid>
      <Grid xs={11} item>
        <div className={classes.articleWrapper}>
          <Link
            className={classes.linkWrapper}
            to={`/user/${commentProps.username}`}
          >
            <div className={classes.userWrapper}>
              <Typography className={classes.userText}>
                @{commentProps.username} {commentProps.date}
              </Typography>
            </div>
          </Link>
          <Grid item xs>
            <Typography variant="subtitle1">{commentProps.text}</Typography>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default Comment;
