import { Typography } from "@material-ui/core";
import React from "react";

export const Counter = ({ text, number }: { text: string; number: number }) => {
  return (
    <div>
      <Typography variant="subtitle1" color="textSecondary">
        {text}
      </Typography>
      <Typography variant="h5">
        {number}
      </Typography>
    </div>
  );
};
