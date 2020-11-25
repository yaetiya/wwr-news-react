import { Avatar, Button, makeStyles, Typography } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Apps";
import {
  selectIsUserLoaded,
  selectUserData,
} from "../store/ducks/user/selectors";
import { BackButton } from "./BackButton";
import { redirectPaths } from "../configs/redirect";
import { primaryColor, secondaryBackgroundColor } from "../configs/palette";
import { userRoles } from "../configs/userRoles";
import { animateScroll } from "react-scroll";
import { isMobile } from "../configs/device";
import { OutlinedTextField } from "./styledComponents/OutlinedTextField";
import { fetchChannels } from "../store/ducks/searchChannel/actionCreators";
import { selectChannels } from "../store/ducks/searchChannel/selectors";
import { SearchContent } from "./SearchContent";

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
  navSearchField: {
    input: {
      height: 30,
    },
    height: 30,
    marginTop: 5,
  },
  navBtn: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const channels = useSelector(selectChannels);
  const user = useSelector(selectUserData);
  const classes = stylesNav();
  let scroll = animateScroll;

  const serchTextHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setSearchText(event.target.value);
  };
  useEffect(() => {
    dispatch(fetchChannels(searchText));
  }, [dispatch, searchText]);

  return (
    <div className={classes.navWrapper}>
      <div style={{ display: "flex" }}>
        <BackButton />
        <div>
          <OutlinedTextField
            className={classes.navSearchField}
            value={searchText}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            name="search"
            onChange={serchTextHandler}
          />
          {channels.map((item) => (
            <div style={{background: secondaryBackgroundColor, borderRadius: 2}}>
              <SearchContent {...item} />
            </div>
          ))}
        </div>
      </div>
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
