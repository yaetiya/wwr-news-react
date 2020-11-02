import {
  FormControl,
  FormGroup,
  TextField,
  Button,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { Alert } from "@material-ui/lab";
import {
  secondaryTextColor,
} from "../configs/palette";
import { fetchAddNews } from "../store/ducks/news/actionCreators";
import { preNews } from "../store/ducks/news/typescript/state";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddMessage,
  selectIsAddPostLoaded,
} from "../store/ducks/news/selectors";

const stylesFormNewPost = makeStyles((theme) => ({
  newPost: {
    color: secondaryTextColor,
    top: 0,
  },
  newPostField: {
    marginBottom: 20,
  },
  newPostBtn: {
    marginBottom: 50,
    boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.28)",
  },
}));

export const NewPostForm = () => {
  const classes = stylesFormNewPost();
  const IsNewPostLoaded = useSelector(selectIsAddPostLoaded);
  const newPostMessage = useSelector(selectAddMessage);
  const [openNewPostMessage, setOpenNewPostMessage] = useState(false);
  const dispatch = useDispatch();
  const [newPostForm, setNewPostForm] = useState<preNews>({
    headline: "",
    text: "",
  });

  useEffect(() => {
    if (IsNewPostLoaded) {
      setNewPostForm({ headline: "", text: "" });
    }
  }, [IsNewPostLoaded]);

  const changeNewPostInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setNewPostForm({
      ...newPostForm,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const sendNewPostData = () => {
    dispatch(
      fetchAddNews({
        text: newPostForm.text,
        headline: newPostForm.headline,
      })
    );
    setTimeout(() => {
      setOpenNewPostMessage(true);
    }, 1000);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNewPostMessage(false);
  };
  return (
    <>
      <Snackbar
        transitionDuration={200}
        open={openNewPostMessage}
        autoHideDuration={3500}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={!IsNewPostLoaded ? "error" : "success"}
        >
          {!IsNewPostLoaded ? newPostMessage : "The new post was published"}
        </Alert>
      </Snackbar>
      <div className={classes.newPost}>
        <FormControl component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <TextField
              className={classes.newPostField}
              style={{ marginTop: 50 }}
              autoFocus
              id="headline"
              label="Headline"
              InputLabelProps={{
                shrink: true,
              }}
              value={newPostForm?.headline}
              variant="outlined"
              type="headline"
              name="headline"
              fullWidth
              onChange={changeNewPostInputHandler}
            />
            <TextField
              className={classes.newPostField}
              autoFocus
              id="text"
              label="Post body"
              multiline
              InputLabelProps={{
                shrink: true,
              }}
              value={newPostForm?.text}
              variant="outlined"
              type="text"
              name="text"
              fullWidth
              onChange={changeNewPostInputHandler}
            />
            <Button
              onClick={sendNewPostData}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.newPostBtn}
            >
              <CreateIcon />
            </Button>
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};
