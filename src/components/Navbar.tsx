import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Apps";
import {
  selectIsUserLoaded,
  selectUserData,
} from "../store/ducks/user/selectors";
import { BackButton } from "./BackButton";
import { redirectPaths } from "../configs/redirect";
import { primaryColor } from "../configs/palette";
import { userRoles } from "../configs/userRoles";
import { animateScroll } from "react-scroll";
import { isMobile } from "../configs/device";

const stylesNav = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
  },
  avatar: {
    marginLeft: 12,
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  navWrapper: {
    paddingTop: 4,
    zIndex: 999,
    height: 50,
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    justifyContent: "space-between",
  },
  navLogo: {},
  loginWrapper: {
    marginRight: isMobile ? 0 : 38,
  },
  navBtn: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const user = useSelector(selectUserData);
  const classes = stylesNav();
  let scroll = animateScroll;

  return (
    <div className={classes.navWrapper}>
      <BackButton />

      <Link
        className={classes.navBtn}
        to={isLoggedIn ? redirectPaths.home : `${redirectPaths.tag}/TRENDS`}
        onClick={() => {
          scroll.scrollToTop();
        }}
      >
        <Button disableRipple>
          <HomeIcon />
        </Button>
      </Link>
      <div className={classes.loginWrapper}>
        {user ? (
          <Link
            className={classes.navBtn}
            to={`${redirectPaths.user}/${user.username}`}
          >
            <Button>
              <Typography variant="subtitle1">
                {user?.role === userRoles.admin ? (
                  <span style={{ color: primaryColor, fontWeight: "bold" }}>
                    [A]
                  </span>
                ) : (
                  <span>@</span>
                )}
                {user.username}
              </Typography>
              <Avatar
                alt="avatar"
                variant="rounded"
                src={user.avatarUrl}
                className={classes.avatar}
              />
            </Button>
          </Link>
        ) : (
          <Link className={classes.navBtn} to={redirectPaths.auth}>
            <Button>
              <Typography variant="subtitle1">Login</Typography>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
