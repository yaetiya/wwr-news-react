import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { primaryColor } from "../../configs/palette";
import { isHome, redirectPaths } from "../../configs/redirect";
import {
  selectTagsItems,
  selectIsTagsLoaded,
} from "../../store/ducks/tags/selectors";
import { selectIsUserLoaded } from "../../store/ducks/user/selectors";

const stylesSideBar = makeStyles(() => ({
  sideWrapper: {
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    textAlign: "right",
    position: "fixed",
    top: "50%",
    right: 38,
    transform: "translate(0%, -50%)",
  },
  activeTab: {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: -12,
      width: 10,
      height: 10,
      display: "block",
      background: primaryColor,
      boxShadow: "0px 4px 6px rgba(5, 0, 255, 0.28)",
      transition: "1s",
    },
    "&:hover": {
      "&:before": {
        boxShadow: "0px -4px 6px rgba(5, 0, 255, 0.38)",
      },
    },
  },
  "@media (max-width: 1200px)": {
    sideWrapper: {
      display: "flex",
      position: "relative",
      transform: "translate(0%, -50%)",
      left: 0,
      justifyContent: "center",
      "& a": {
        margin: 10,
      },
    },

    activeTab: {
      "&:before": { top: 17, left: -8 },
    },
  },
  "@media (max-width: 450px)": {
    sideWrapper: {
      textAlign: "center",
      display: "block",
      position: "relative",
      transform: "translate(0%, 0%)",
      left: 0,
      justifyContent: "center",
      "& a": {
        margin: 10,
      },
    },

    activeTab: {
      "&:before": { top: 6, right: 0 },
    },
  },
}));

export const SideBar = () => {
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const location = useLocation();
  const activeTab: string =
    location.pathname.split("/")[1] === redirectPaths.tag.slice(1)
      ? location.pathname.split("/")[2]
      : location.pathname.split("/")[1];
  const classes = stylesSideBar();
  const tags = useSelector(selectTagsItems);
  const isTagsLoaded = useSelector(selectIsTagsLoaded);
  return (
    <div className={classes.sideWrapper}>
      {isLoggedIn ? (
        <Link
          to={redirectPaths.home}
          className={
            isHome(location.pathname)
              ? classes.activeTab
              : undefined
          }
        >
          <Button disableRipple>Home</Button>
        </Link>
      ) : null}
      <br />
      {isTagsLoaded
        ? tags.map((tag) =>
            tag.name === activeTab ? (
              <>
                <Link
                  to={`${redirectPaths.tag}/${tag.name}`}
                  className={classes.activeTab}
                >
                  <Button disableRipple>#{tag.name}</Button>
                </Link>
                <br />
              </>
            ) : (
              <>
                <Link to={`${redirectPaths.tag}/${tag.name}`}>
                  <Button disableRipple>#{tag.name}</Button>
                </Link>
                <br />
              </>
            )
          )
        : null}
      <br />
    </div>
  );
};
