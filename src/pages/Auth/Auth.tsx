import React, { ChangeEvent, useEffect, useState } from "react";
import { makeStyles, Typography, Button, Snackbar } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { ModalBlock } from "./components/ModalBlock";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import {
  createUser,
  fetchUserData,
  setUserLoadingState,
} from "../../store/ducks/user/actionCreators";
import {
  selectErrorMessage,
  selectErrorRegistrationField,
  selectIsRegistrationError,
  selectIsRegistrationSuccess,
  selectIsUserError,
  selectIsUserLoaded,
} from "../../store/ducks/user/selectors";
import { Redirect } from "react-router-dom";
import {
  LoadingState,
  SignUpData,
  UserLoadingData,
} from "../../store/ducks/user/typescript/state";
import { SignUpForm } from "./components/SignUpForm";

export function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const useStylesSignIn = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    height: "100vh",
  },

  loginSide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 100%",
  },
  loginSideWrapper: {
    width: 380,
  },
  loginSideTitle: {
    fontWeight: 300,
    fontSize: 32,
    marginBottom: 60,
    marginTop: 20,
  },
  loginSideField: {
    marginBottom: 18,
  },
  registerField: {
    marginBottom: theme.spacing(5),
  },
  loginFormControl: {
    marginBottom: theme.spacing(2),
  },
}));

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStylesSignIn();
  const dispatch = useDispatch();
  const [openErrorLogin, setOpenErrorLogin] = React.useState(false);
  const [openErrorRegistration, setOpenErrorRegistration] = useState(false);
  const isRegistrationSuccess = useSelector(selectIsRegistrationSuccess);
  const regErrorMessage = useSelector(selectErrorMessage);
  const isLoggedIn = useSelector(selectIsUserLoaded);
  const isErrorLogin = useSelector(selectIsUserError);
  const [checker, setChecker] = useState(false);
  const isErrorRegistration = useSelector(selectIsRegistrationError);
  const ErrorRegistrationField = useSelector(selectErrorRegistrationField);
  const [visibleModal, setVisibleModal] = useState<"signIn" | "signUp">();

  const handleErrorLoginAlert = () => {
    setOpenErrorLogin(true);
  };
  const handleErrorRegistrationAlert = () => {
    setOpenErrorRegistration(true);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenErrorRegistration(false);
    setOpenErrorLogin(false);
  };
  const [signUpForm, setSignUpForm] = useState<SignUpData>({
    password: "",
    password2: "",
    username: "",
    fullname: "",
    email: "",
  });
  const [loginForm, setLoginForm] = useState<UserLoadingData>({
    username: "",
    password: "",
  });

  const handleClickOpenSignIn = (): void => {
    setVisibleModal("signIn");
  };

  const handleClickOpenSignUp = (): void => {
    setVisibleModal("signUp");
  };

  const login = (): void => {
    dispatch(fetchUserData(loginForm));
  };

  useEffect(() => {
    if (isErrorLogin === true) {
      handleErrorLoginAlert();
      dispatch(setUserLoadingState(LoadingState.NEVER));
    }
  }, [dispatch, isErrorLogin]);

  useEffect(() => {
    if (isErrorRegistration === true) {
      handleErrorRegistrationAlert();
    }
  }, [isErrorRegistration, regErrorMessage, checker]);

  const signUp = (): void => {
    dispatch(createUser(signUpForm));
    setTimeout(() => {
      setChecker(!checker);
    }, 500);
  };

  useEffect(() => {
    handleCloseModal();
    setLoginForm({
      username: "",
      password: "",
    });
  }, [isLoggedIn]);

  useEffect(() => {
    handleCloseModal();
    setSignUpForm({
      password: "",
      password2: "",
      username: "",
      fullname: "",
      email: "",
    });
  }, [isRegistrationSuccess]);

  const handleCloseModal = (): void => {
    setVisibleModal(undefined);
  };

  const changeSignUpInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setSignUpForm({
      ...signUpForm,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const changeLoginInputHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setLoginForm({
      ...loginForm,
      ...{ [event.target.name]: event.target.value },
    });
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
    // return <Redirect to="/private" />;
  }

  return (
    <div className={classes.wrapper}>
      <Snackbar
        open={openErrorLogin}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Data is not correct.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorRegistration}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {regErrorMessage}
        </Alert>
      </Snackbar>

      <section className={classes.loginSide}>
        <div className={classes.loginSideWrapper}>
          <Typography
            className={classes.loginSideTitle}
            gutterBottom
            variant="h4"
          >
            Откройте мир, окружающий Вас каждый день
          </Typography>
          <Typography>
            <b>Присоединяйтесь к VEEV!</b>
          </Typography>
          <br />
          <Button
            onClick={handleClickOpenSignUp}
            style={{ marginBottom: 20 }}
            variant="contained"
            color="primary"
            fullWidth
          >
            Зарегистрироваться
          </Button>
          <Button
            onClick={handleClickOpenSignIn}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Войти
          </Button>
          <ModalBlock
            visible={visibleModal === "signIn"}
            onClose={handleCloseModal}
            classes={classes}
            title="Войти в аккаунт"
          >
            <FormControl
              className={classes.loginFormControl}
              component="fieldset"
              fullWidth
            >
              <FormGroup aria-label="position" row>
                <TextField
                  className={classes.loginSideField}
                  autoFocus
                  id="username"
                  label="Username"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={loginForm?.username}
                  variant="outlined"
                  type="username"
                  name="username"
                  fullWidth
                  onChange={changeLoginInputHandler}
                />
                <TextField
                  className={classes.loginSideField}
                  autoFocus
                  id="password"
                  label="Пароль"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={loginForm?.password}
                  variant="outlined"
                  type="password"
                  name="password"
                  fullWidth
                  onChange={changeLoginInputHandler}
                />
                <Button
                  onClick={login}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Войти
                </Button>
              </FormGroup>
            </FormControl>
          </ModalBlock>
          <ModalBlock
            visible={visibleModal === "signUp"}
            onClose={handleCloseModal}
            classes={classes}
            title="Создайте учетную запись"
          >
            
            <SignUpForm {...{classes,
              ErrorRegistrationField,
              changeSignUpInputHandler,
              signUpForm,
              signUp}}/>
          </ModalBlock>
        </div>
      </section>
    </div>
  );
};
