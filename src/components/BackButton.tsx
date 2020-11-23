import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { isMobile } from "../configs/device";

export const BackButton: React.FC = (): React.ReactElement => {
  const history = useHistory();

  const handleClickButton = () => {
    history.goBack();
  };

  return (
    <Button
      onClick={handleClickButton}
      style={{ marginLeft: isMobile ? 0 : 38 }}
      color="primary"
    >
      <ArrowBackIosIcon />
    </Button>
  );
};
