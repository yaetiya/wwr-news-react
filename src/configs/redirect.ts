export const redirectPaths = {
  auth: "/auth",
  home: "/home",
  oneNews: "/oneNews",
  user: "/user",
  private: "/private",
  tag: "/tag",
};

// const location = window.location;
export const isHome = (path: string): boolean =>
  path === redirectPaths.home || path === "/";

export const isPage = (path: string): boolean =>
  path.split("/")[1] === redirectPaths.user.slice(1);
