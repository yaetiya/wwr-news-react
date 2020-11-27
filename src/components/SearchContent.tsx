import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Apps";
import { Channel } from "../store/ducks/searchChannel/typescript/state";
import AppleIcon from "@material-ui/icons/Apple";
import { secondaryTextColor } from "../configs/palette";
import { redirectPaths } from "../configs/redirect";
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
    <Link
      style={{ textDecoration: "none", color: "inherit" }}
      to={link ? link : `${redirectPaths.user}/${name}`}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
          transition: "1s",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: `url(${avatarUrl}) no-repeat`,
              backgroundSize: "cover",
              height: 35,
              width: 35,
              borderRadius: 2,
            }}
          />

          <Typography
            variant="subtitle2"
            style={{
              marginLeft: 10,
              marginTop: 6,
            }}
          >
            {name.slice(0, 8)}
          </Typography>
        </div>
        <ChannelIcon
          style={{ marginTop: 5, fontSize: 26, color: secondaryTextColor }}
        />
      </div>
    </Link>
  );
};
