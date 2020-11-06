import { FormControl, FormGroup, Button } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { OutlinedTextField } from "../../../components/styledComponents/OutlinedTextField";
import { SignUpData } from "../../../store/ducks/user/typescript/state";

type TSignUpFormProps = {
  classes: any;
  ErrorRegistrationField: string | undefined;
  changeSignUpInputHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  signUpForm: SignUpData;
  signUp: () => void;
};
export const SignUpForm = (
  {
    classes,
    ErrorRegistrationField,
    changeSignUpInputHandler,
    signUpForm,
    signUp,
  }: TSignUpFormProps
): React.ReactElement => {
  return (
    <FormControl
      className={classes.loginFormControl}
      component="fieldset"
      fullWidth
    >
      <FormGroup aria-label="position" row>
        <OutlinedTextField
          error={ErrorRegistrationField === "fullname"}
          className={classes.registerField}
          autoFocus
          id="name"
          label="Имя"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          type="name"
          name="fullname"
          onChange={changeSignUpInputHandler}
          fullWidth
          value={signUpForm?.fullname}
        />
        <OutlinedTextField
          className={classes.registerField}
          error={ErrorRegistrationField === "email"}
          autoFocus
          id="email"
          label="E-Mail"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          type="email"
          name="email"
          fullWidth
          onChange={changeSignUpInputHandler}
          value={signUpForm?.email}
        />
        <OutlinedTextField
          className={classes.registerField}
          autoFocus
          error={ErrorRegistrationField === "username"}
          id="username"
          label="Username"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          type="username"
          name="username"
          fullWidth
          onChange={changeSignUpInputHandler}
          value={signUpForm?.username}
        />

        <OutlinedTextField
          className={classes.registerField}
          autoFocus
          error={ErrorRegistrationField === "password"}
          id="password"
          label="Пароль"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          type="password"
          fullWidth
          name="password"
          onChange={changeSignUpInputHandler}
          value={signUpForm?.password}
        />
        <OutlinedTextField
          className={classes.registerField}
          autoFocus
          error={ErrorRegistrationField === "password"}
          id="password2"
          label="Повторите пароль"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          type="password"
          name="password2"
          fullWidth
          onChange={changeSignUpInputHandler}
          value={signUpForm?.password2}
        />
        <Button variant="contained" color="primary" onClick={signUp} fullWidth>
          Зарегистрироваться
        </Button>
      </FormGroup>
    </FormControl>
  );
};
