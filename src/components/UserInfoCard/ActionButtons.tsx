import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isMobile } from "../../configs/device";
import { redirectPaths } from "../../configs/redirect";
import ImageUploader from "react-images-upload";
import {
  changeUserAvatar,
  logoutUser,
  setChangeFetcheduserAvatar,
} from "../../store/ducks/user/actionCreators";
import {
  defaultBackgroundColor,
  defaultErrorColor,
  primaryColor,
  secondaryTextColor,
} from "../../configs/palette";
import { selectIsChangeAvatarLoading } from "../../store/ducks/user/selectors";
import { LinearProgress } from "@material-ui/core";

export const ActionButtons = () => {
  const history = useHistory();
  const isChangeAvatarLoading = useSelector(selectIsChangeAvatarLoading);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push(redirectPaths.auth);
  };
  const changeAvaratHandler = (file: File[], picture: string[]) => {
    if (picture[0] && file[0]) {
      dispatch(changeUserAvatar(picture[0]));
      const newAvatarUrl = URL.createObjectURL(file[0]);
      dispatch(setChangeFetcheduserAvatar(newAvatarUrl));
    }
  };
  return (
    <>
      <Button
        onClick={logoutHandler}
        variant="outlined"
        color="primary"
        style={isMobile ? { marginRight: 8 } : { margin: 0 }}
        fullWidth
      >
        Logout
      </Button>
      <ImageUploader
        singleImage
        withIcon={false}
        withLabel={false}
        buttonText="Change avatar"
        onChange={changeAvaratHandler}
        buttonStyles={{
          backgroundColor: defaultBackgroundColor,
          color: primaryColor,
          fontWeight: "bold",
          border: "2px solid " + secondaryTextColor,
          borderRadius: 0,
          // marginRight: 10,
          marginTop: isMobile ? 0 : 10,
          marginBottom: 0,
          marginLeft: 0,
          height: 40,
          padding: 0,
          width: "100%",
          fontSize: 14,
          boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.06)",
        }}
        errorStyle={{
          position: "absolute",
          left: 0,
          top: 50,
          zIndex: 2,
          padding: 3,
          borderRadius: 2,
          backgroundColor: defaultErrorColor,
          color: defaultBackgroundColor,
        }}
        fileContainerStyle={{
          boxShadow: "none",
          margin: 0,
          padding: 0,
        }}
        imgExtension={[".jpg", ".gif", ".png"]}
        maxFileSize={5242880}
      />
      {isChangeAvatarLoading ? <LinearProgress /> : null}
    </>
  );
};
