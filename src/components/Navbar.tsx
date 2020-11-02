import { Button, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "./BackButton";

const stylesNav = makeStyles((theme) => ({
  root: {
    paddingLeft: 40,
    paddingRight: 40,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.background.default,
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
  loginWrapper: {},
  navBtn: {
    color: "inherit",
    textDecoration: "none",
  },
  ArticlesWrapper: {
    position: "sticky",
    top: 40,
    backgroundColor: theme.palette.background.default,
  },

  sideWrapper: {
    "& a": {
      color: "inherit",
      textDecoration: "none",
    },
    paddingTop: 40,
    position: "sticky",
    top: 0,
  },

  buttonSideBlock: {
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "0.2rem",
      display: "block",
      background: theme.palette.secondary.main,
    },
  },
}));

type TNav = {
  isLoggedIn: boolean;
  username: string | undefined;
};

const Navbar = ({ isLoggedIn, username }: TNav) => {
  const classes = stylesNav();
  return (
    <Container maxWidth="lg" className={classes.navWrapper}>
      <BackButton />

      <Link className={classes.navBtn} to="/signin">
        <Button>Logo</Button>
      </Link>
      <div className={classes.loginWrapper}>
        {!isLoggedIn ? (
          <Link className={classes.navBtn} to="/signin">
            <Button>Login</Button>
          </Link>
        ) : (
          <Link className={classes.navBtn} to="/private">
            <Button>{username}</Button>
          </Link>
        )}
      </div>
    </Container>
  );
};
export default Navbar;
