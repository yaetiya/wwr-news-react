import { Collapse, makeStyles } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  defaultTextColor,
  primaryColor,
  secondaryBackgroundColor,
} from "../../configs/palette";
import { deleteNotificationById } from "../../store/ducks/notifications/actionCreators";
import { Notifications } from "../../store/ducks/notifications/typescript/state";

const stylesOneNotifacation = makeStyles(() => ({
  notificationBody: { marginBottom: 20 },
  ranked0: {
    fontSize: 12,
    backgroundColor: secondaryBackgroundColor,
  },
  ranked0Headline: {
    fontSize: 12,
    fontWeight: 500,
  },
  ranked1: {
    fontSize: 12,
    backgroundColor: secondaryBackgroundColor,
    borderTop: "2px solid " + primaryColor,
    borderRadius: 0,
  },
  ranked1Headline: {
    fontSize: 14,
  },
  ranked2: {
    fontSize: 12,
    borderRadius: "3px",
    border: "2px solid " + primaryColor,
    boxShadow: "0px 4px 10px rgba(5, 0, 255, 0.06)",
  },
  ranked2Headline: {
    fontSize: 14,
    paddingLeft: 14,
    color: defaultTextColor,
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      bottom: 6,
      left: -1,
      width: 10,
      height: 10,
      display: "block",
      background: primaryColor,
      boxShadow: "0px 4px 6px rgba(5, 0, 255, 0.18)",
      transition: "1s",
    },
  },
}));
export const OneNotification = ({
  _id,
  text,
  headline,
  rank,
}: Notifications) => {
  const [isOpen, setIsOpen] = useState(true);
  const classes = stylesOneNotifacation();
  const dispatch = useDispatch();

  const closeHandler = () => {
    setIsOpen(false);
    setTimeout(() => {
      dispatch(deleteNotificationById(_id));
    }, 500);
  };
  switch (rank) {
    case 0:
      return (
        <Collapse in={isOpen}>
          <div className={classes.notificationBody}>
            <Alert
              onClose={closeHandler}
              className={classes.ranked0}
              icon={false}
            >
              <AlertTitle className={classes.ranked0Headline}>
                {headline}
              </AlertTitle>
              {text}
            </Alert>
          </div>
        </Collapse>
      );
    case 1:
      return (
        <Collapse in={isOpen}>
          <div className={classes.notificationBody}>
            <Alert
              onClose={closeHandler}
              className={classes.ranked1}
              icon={false}
            >
              <AlertTitle className={classes.ranked1Headline}>
                {headline}
              </AlertTitle>
              {text}
            </Alert>
          </div>
        </Collapse>
      );
    case 2:
      return (
        <div className={classes.notificationBody}>
          <Alert className={classes.ranked2} icon={false}>
            <AlertTitle className={classes.ranked2Headline}>
              {headline}
            </AlertTitle>
            {text}
          </Alert>
        </div>
      );
    default:
      return null;
  }
};
