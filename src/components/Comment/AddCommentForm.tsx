import {
  FormControl,
  FormGroup,
  Button,
  makeStyles,
  Snackbar,
  Grid,
} from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { alertsStyle } from "../../configs/palette";
import {
  selectAddCommentErrorMessage,
  selectOneNewsData,
} from "../../store/ducks/oneNews/selectors";
import { sendCommentOneNewsData } from "../../store/ducks/oneNews/actionCreators";
import { OutlinedTextField } from "../styledComponents/OutlinedTextField";
import { useHistory } from "react-router-dom";
import { selectJWT } from "../../store/ducks/user/selectors";
import { redirectPaths } from "../../configs/redirect";

const stylesFormNewComment = makeStyles(() => ({
  newCommentField: {
    marginTop: 10,
  },
  newCommentBtn: {
    boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.28)",
  },
  newCommentBtnWrapper: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: "right",
  },
  newCommentBtnIcon: {},
}));

export const NewCommentForm = () => {
  const classes = stylesFormNewComment();
  const newCommentErrorMessage = useSelector(selectAddCommentErrorMessage);
  const [openNewCommentMessage, setOpenNewCommentMessage] = useState(false);
  const postId = useSelector(selectOneNewsData)?._id;
  const dispatch = useDispatch();
  const history = useHistory();
  const jwt = useSelector(selectJWT);
  const [newCommentForm, setNewCommentForm] = useState({
    text: "",
  });

  const changeNewCommentInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setNewCommentForm({
      ...newCommentForm,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const sendNewCommentData = () => {
    if (jwt) {
      if (postId) {
        dispatch(
          sendCommentOneNewsData({
            text: newCommentForm.text,
            postId: postId,
          })
        );
        setNewCommentForm({ text: "" });
      }

      setTimeout(() => {
        setOpenNewCommentMessage(true);
      }, 500);
    } else {
      history.push(redirectPaths.auth);
    }
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNewCommentMessage(false);
  };
  return (
    <>
      <Snackbar
        transitionDuration={200}
        open={openNewCommentMessage && newCommentErrorMessage !== undefined}
        autoHideDuration={3500}
        onClose={handleClose}
      >
        <Alert
          style={alertsStyle(false)}
          onClose={handleClose}
          severity={"error"}
        >
          {newCommentErrorMessage}
        </Alert>
      </Snackbar>
      <div>
        <FormControl component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <Grid container spacing={0}>
              <Grid item xs={1}></Grid>
              <Grid item xs>
                <OutlinedTextField
                  multiline
                  className={classes.newCommentField}
                  id="comment"
                  label="Comment"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={newCommentForm?.text}
                  variant="outlined"
                  type="comment"
                  fullWidth
                  name="text"
                  onChange={changeNewCommentInputHandler}
                />
                <div className={classes.newCommentBtnWrapper}>
                  <Button
                    onClick={sendNewCommentData}
                    variant="contained"
                    color="primary"
                    className={classes.newCommentBtn}
                  >
                    <CreateIcon className={classes.newCommentBtnIcon} />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};
