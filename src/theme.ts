// @ts-nocheck

import { createMuiTheme } from "@material-ui/core/styles";
import {
  defaultTextColor,
  secondaryBackgroundColor,
  secondaryTextColor,
  defaultBackgroundColor,
  defaultErrorColor,
} from "./configs/palette";

export const theme = createMuiTheme({
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
      main: secondaryBackgroundColor,
      dark: secondaryTextColor,
      contrastText: "#fff",
    },
    secondary: {
      main: secondaryBackgroundColor,
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
        fontSize: 16,
        height: 40,
        fontWeight: 700,
        "&:hover":{
          backgroundColor: "transpatern"
        }
      },
      textPrimary: {
        paddingLeft: 20,
        paddingRight: 20,
      },
      outlinedPrimary: {
        borderColor: secondaryTextColor,
        borderWidth: 2,
        "&:hover": {
          borderWidth: 2,
        },
      },
    },
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
