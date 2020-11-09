import { TextField, withStyles } from "@material-ui/core";
import {
  primaryColor,
  secondaryTextColor,
} from "../../configs/palette";

export const OutlinedTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: primaryColor,
      transition: "2s",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: secondaryTextColor,
      borderWidth: 2,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        transition: "2s",
        borderColor: secondaryTextColor,
        borderWidth: 2,
      },
      "&:hover fieldset": {
        borderColor: primaryColor,
        transition: "2s",
        borderWidth: 2,
      },
      "&.Mui-focused fieldset": {
        borderColor: primaryColor,
        transition: "2s",
        borderWidth: 2,
      },
    },
  },
})(TextField);
