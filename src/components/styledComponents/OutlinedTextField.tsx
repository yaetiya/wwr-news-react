import { TextField, withStyles } from "@material-ui/core";
import { secondaryBackgroundColor, secondaryTextColor } from "../../configs/palette";

export const OutlinedTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: secondaryBackgroundColor,
        transition: "2s",
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: secondaryTextColor,
        borderWidth: 2,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: secondaryTextColor,
          borderWidth: 2,
        },
        '&:hover fieldset': {
          borderColor: secondaryBackgroundColor,
          transition: "2s",
          borderWidth: 2,
        },
        '&.Mui-focused fieldset': {
          borderColor: secondaryBackgroundColor,
          transition: "2s",
          borderWidth: 2,
        },
      },
    },
  })(TextField);