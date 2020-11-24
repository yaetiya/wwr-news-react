import {
  FormControl,
  FormGroup,
  Button,
  makeStyles,
  Snackbar,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import { Alert } from "@material-ui/lab";
import {
  alertsStyle,
  primaryShadow,
  secondaryTextColor,
} from "../../configs/palette";
import {
  fetchAddNews,
  setAddFormState,
  setAddMessage,
} from "../../store/ducks/news/actionCreators";
import { AddFormState, preNews } from "../../store/ducks/news/typescript/state";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddMessage,
  selectIsAddPostLoaded,
  selectIsNewPostLoading,
} from "../../store/ducks/news/selectors";
import { OutlinedTextField } from "../styledComponents/OutlinedTextField";
import { selectJWT } from "../../store/ducks/user/selectors";
import { useHistory } from "react-router-dom";
import { redirectPaths } from "../../configs/redirect";
import { ChooseMediaBtn } from "./ChooseMediaBtn";
import { isMobile } from "../../configs/device";
import { MediaPreview } from "../MediaPreview";
import { getRandomString } from "../../configs/randomKeyGenerator";
const stylesFormNewPost = makeStyles((_) => ({
  newPost: {
    color: secondaryTextColor,
    top: 0,
    marginBottom: 20,
  },
  newPostField: {
    marginBottom: 20,
  },
  newPostBtn: {
    marginBottom: isMobile ? 0 : 0,
    boxShadow: primaryShadow,
  },
}));
export const NewPostForm = () => {
  const [randomKey, setRandomKey] = useState(getRandomString());
  const [localFiles, setLocalFiles] = useState<string[]>([]);
  const isLoadingRequest = useSelector(selectIsNewPostLoading);
  const classes = stylesFormNewPost();
  const IsNewPostLoaded = useSelector(selectIsAddPostLoaded);
  const jwt = useSelector(selectJWT);
  const newPostMessage = useSelector(selectAddMessage);
  const history = useHistory();
  const [checker, setChecker] = useState(false);
  const [openNewPostMessage, setOpenNewPostMessage] = useState(false);
  const dispatch = useDispatch();
  const [newPostForm, setNewPostForm] = useState<preNews>({
    headline: "",
    text: "",
    media: [],
  });

  useEffect(() => {
    if (IsNewPostLoaded) {
      setNewPostForm({ headline: "", text: "", media: [] });
      setLocalFiles([]);
      setRandomKey(getRandomString());
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
  const mediaHandler = (files: File[], pictures: string[]) => {
    if (newPostForm.media.length < 6) {
      setNewPostForm({
        ...newPostForm,
        media: [...newPostForm.media, ...pictures].slice(0, 5),
      });
      setLocalFiles([
        ...localFiles,
        ...files.slice(0, 5).map((file) => URL.createObjectURL(file)),
      ]);
      setRandomKey(getRandomString());
    }
  };
  const sendNewPostData = () => {
    if (jwt) {
      dispatch(fetchAddNews(newPostForm));
      setTimeout(() => {
        setChecker(!checker);
      }, 500);
    } else {
      history.push(redirectPaths.auth);
    }
  };
  useEffect(() => {
    if (IsNewPostLoaded || newPostMessage) {
      setOpenNewPostMessage(true);
    }
  }, [IsNewPostLoaded, checker, newPostMessage]);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenNewPostMessage(false);
    setTimeout(() => {
      dispatch(setAddFormState(AddFormState.NEVER));
      dispatch(setAddMessage(""));
    }, 500);
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
          style={alertsStyle(IsNewPostLoaded)}
          onClose={handleClose}
          severity={!IsNewPostLoaded ? "error" : "success"}
        >
          {!IsNewPostLoaded ? newPostMessage : "The new post was published"}
        </Alert>
      </Snackbar>
      <div className={classes.newPost}>
        <FormControl component="fieldset" fullWidth>
          <FormGroup aria-label="position" row>
            <OutlinedTextField
              className={classes.newPostField}
              style={{ marginTop: 15 }}
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
            <OutlinedTextField
              className={classes.newPostField}
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
            <Grid container spacing={3}>
              <Grid item xs={isMobile ? 12 : 10}>
                <Button
                  onClick={sendNewPostData}
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.newPostBtn}
                >
                  <CreateIcon />
                </Button>
                {isLoadingRequest ? <LinearProgress /> : null}
              </Grid>
              <Grid item xs>
                <ChooseMediaBtn mediaHandler={mediaHandler} key={randomKey} />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
        <div style={{ marginTop: isLoadingRequest ? 11 : 15 }}>
          <MediaPreview mediaUrls={localFiles} />
        </div>
      </div>
    </>
  );
};
