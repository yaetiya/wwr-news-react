import { makeStyles } from "@material-ui/core";
import React from "react";
import { secondaryBackgroundColor } from "../../configs/palette";

const stylesFooter = makeStyles(() => ({
  footerWrapper: {
    height: 100,
    backgroundColor: secondaryBackgroundColor,
  },
}));
export const Footer = () => {
  const classes = stylesFooter();

  return <footer className={classes.footerWrapper}></footer>;
};
