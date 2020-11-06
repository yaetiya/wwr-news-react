import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectTagsItems,
  selectIsTagsLoaded,
} from "../../store/ducks/tags/selectors";

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
}));

export const SideBar = () => {
  const classes = stylesSideBar();
  const tags = useSelector(selectTagsItems);
  const isTagsLoaded = useSelector(selectIsTagsLoaded);
  return (
    <div className={classes.sideWrapper}>
      <Link to="/home">
        <Button>Home</Button>
      </Link>
      <br />
      <Link to="/trends">
        <Button>Trends</Button>
      </Link>
      <br />
      {isTagsLoaded
        ? tags.map((tag) => (
            <>
              <Link to={`/tag/${tag._id}`}>
                <Button>{tag.name}</Button>
              </Link>
              <br />
            </>
          ))
        : null}
      <Link to="/settings">
        <Button>Settings</Button>
      </Link>
      <br />
    </div>
  );
};
