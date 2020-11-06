import {
  Avatar,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Home from "@material-ui/icons/Apps";
import { selectUserData } from "../store/ducks/user/selectors";
import { BackButton } from "./BackButton";

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
    marginRight: 38,
  },
  navBtn: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const user = useSelector(selectUserData);
  const classes = stylesNav();
  return (
    <div className={classes.navWrapper}>
      <BackButton />

      <Link className={classes.navBtn} to="/signin">
        <Button>
          <Home />
        </Button>
      </Link>
      <div className={classes.loginWrapper}>
        {user ? (
          <Link className={classes.navBtn} to="/private">
            <Button>
              <Typography variant="subtitle1">@{user.username}</Typography>
              <Avatar
                alt="avatar"
                variant="rounded"
                src={user.avatarUrl}
                className={classes.avatar}
              />
            </Button>
          </Link>
        ) : (
          <Link className={classes.navBtn} to="/signin">
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
