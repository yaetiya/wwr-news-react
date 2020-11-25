// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";
import {
  defaultTextColor,
  primaryColor,
  secondaryTextColor,
  defaultBackgroundColor,
  defaultErrorColor,
  primaryShadow,
} from "./configs/palette";

export const theme = createMuiTheme({
  // props: {
  //   // Name of the component
  //   MuiButtonBase: {
  //     // The properties to apply
  //     centerRipple: true
  //     // disableRipple: true // No more ripple, on the whole application!
  //   }
  // },
  typography: {
    fontFamily: [
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Ubuntu",
      "Helvetica Neue",
      "sans-serif",
    ],
  },
  palette: {
    primary: {
      main: primaryColor,
      dark: secondaryTextColor,
      contrastText: "#fff",
    },
    secondary: {
      main: primaryColor,
    },
    error: {
      main: defaultErrorColor,
    },
    success: {
      main: defaultBackgroundColor,
    },
    background: {
      default: defaultBackgroundColor,
    },
    text: {
      primary: defaultTextColor,
    },
  },
  shadows: [],
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
        textTransform: "none",
        fontSize: 14,
        height: 40,
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "transpatern",
        },
      },
      textPrimary: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      containedPrimary: {
        boxShadow: primaryShadow,
        transition: "1s",
        "&:hover": {
          backgroundColor: primaryColor,
        },
      },
      outlinedPrimary: {
        borderColor: secondaryTextColor,
        borderWidth: 2,
        transition: "1s",
        "&:hover": {
          borderWidth: 2,
        },
      },
    },
    MuiInput: {},
    MuiOutlinedInput: {
      input: {
        backgroundColor: defaultBackgroundColor,
      },
      notchedOutline: {
        borderRadius: 2,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: 3,
      },
    },
    MuiDialogActions: {
      root: {
        marginBottom: 8,
      },
    },
    MuiDialogTitle: {
      root: {
        borderBottom: "1px solid rgb(204, 214, 221)",
        marginBottom: 10,
        padding: "10px 15px",
        "& h2": {
          display: "flex",
          alignItems: "center",
          fontWeight: 300,
        },
        "& button": {
          padding: 8,
          marginRight: 20,
        },
      },
    },
  },
});

export default theme;
