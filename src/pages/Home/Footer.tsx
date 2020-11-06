import { makeStyles } from "@material-ui/core";
import React from "react";
import { secondaryTextColor } from "../../configs/palette";

const stylesFooter = makeStyles(() => ({
  footerWrapper: {
    height: 100,
    backgroundColor: secondaryTextColor,
  },
}));
export const Footer = () => {
  const classes = stylesFooter();

  return <footer className={classes.footerWrapper}></footer>;
};
