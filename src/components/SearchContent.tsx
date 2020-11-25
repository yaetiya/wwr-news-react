import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Apps";
import { Channel } from "../store/ducks/searchChannel/typescript/state";
import AppleIcon from "@material-ui/icons/Apple";
export const SearchContent = ({ name, avatarUrl, type, link }: Channel) => {
  let ChannelIcon = HomeIcon;
  switch (type) {
    case "TELEGRAM":
      ChannelIcon = AppleIcon;
      break;
    default:
      break;
  }
  return (
    <Link style={{ textDecoration: "none", color: "inherit" }} to={link}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <div
          style={{
            background: `url(${avatarUrl}) no-repeat`,
            backgroundSize: "cover",
            height: 40,
            width: 40,
            borderRadius: 6,
          }}
        />

        <Typography
          variant="subtitle2"
          style={{
            marginTop: 10,
          }}
        >
          {name}
        </Typography>
        <ChannelIcon style={{ marginTop: 5, fontSize: 26 }} />
      </div>
    </Link>
  );
};
