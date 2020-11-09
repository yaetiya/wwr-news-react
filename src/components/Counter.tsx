import { Typography } from "@material-ui/core";
import React from "react";

export const Counter = ({ text, value }: { text: string; value: any }) => {
  return (
    <div>
      <Typography variant="subtitle1" color="textSecondary">
        {text}
      </Typography>
      <Typography variant="h5">
        {value ? value : 0}
      </Typography>
    </div>
  );
};
