import { Container, LinearProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectIsNotificationsLoading,
  selectNotificationsItems,
} from "../../store/ducks/notifications/selectors";
import { OneNotification } from "./OneNotification";
const stylesOneNotifacation = makeStyles(() => ({
  notificationHubWrapper: { paddingTop: 10 },
}));
export const NotificationHub = () => {
  const classes = stylesOneNotifacation();

  const notifications = useSelector(selectNotificationsItems);
  const isLoading = useSelector(selectIsNotificationsLoading);
  return (
    <Container maxWidth="md">
      {isLoading ? (
        <LinearProgress />
      ) : (
        <div className={classes.notificationHubWrapper}>
          {notifications.map((item) => (
            <OneNotification {...item} key={item._id} />
          ))}
        </div>
      )}
    </Container>
  );
};
