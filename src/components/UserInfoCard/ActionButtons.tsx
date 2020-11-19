import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { redirectPaths } from "../../configs/redirect";
import { logoutUser } from "../../store/ducks/user/actionCreators";

export const ActionButtons = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push(redirectPaths.auth);
  };
  const changeAvaratHandler = () => {
    console.log("change");
  };
  return (
    <>
      <Button
        onClick={changeAvaratHandler}
        variant="outlined"
        color="primary"
        style={{ margin: 5 }}
        fullWidth
      >
        Change avatar
      </Button>
      <Button
        onClick={logoutHandler}
        variant="outlined"
        color="primary"
        style={{ margin: 5 }}
        fullWidth
      >
        Logout
      </Button>
    </>
  );
};
