import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { animateScroll } from "react-scroll";

export const ScrollTopBtn = () => {
  const [visiable, setVisiable] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      ScrollTopBtnWrapper: {
        transition: "0.5s",
        opacity: visiable ? 1 : 0,
        position: "fixed",
        right: 38,
        bottom: 40,
        background: theme.palette.primary.main,
        borderRadius: 2,
        zIndex: 999,
        boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.28)",
        "&:hover": { background: theme.palette.primary.main },
      },
      ScrollTopBtn: {
        color: theme.palette.background.default,
        "&:hover": { color: theme.palette.background.default },
        height: 44,
        width: 34,
      },
      "@media (max-width: 400px)": {
        ScrollTopBtnWrapper: {
          right: 25,
          bottom: 25,
          height: 44,
          width: 34,
        },
      },
    })
  );

  const classes = useStyles();
  let scroll = animateScroll;
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  let handleScroll = () => {
    if (document.body.getBoundingClientRect().top > -40) {
      setVisiable(false);
    } else {
      setVisiable(true);
    }
  };

  return (
    <Button
      variant="outlined"
      className={classes.ScrollTopBtnWrapper}
      onClick={() => {
        scroll.scrollToTop();
      }}
    >
      <ExpandLessIcon className={classes.ScrollTopBtn} />
    </Button>
  );
};
