import { Typography } from "@material-ui/core";
import React from "react";
import { MediaPreview } from "../MediaPreview";
import { articleProps } from "./Article";

type TArticleBodyProps = {
  articleProps: articleProps;
  classes: any;
};

export const ArticleBody = ({ articleProps, classes }: TArticleBodyProps) => {
  return (
    <>
      <Typography component="h1" className={classes.generalHeadline}>
        {articleProps.generalHeadline}
      </Typography>
      <Typography component="h2" className={classes.mainHeadline}>
        {articleProps.mainHeadline}
      </Typography>
      <Typography component="h4" className={classes.secondaryHeadline}>
        {articleProps.secondaryHeadline}
      </Typography>

      <Typography className={classes.paragraph}>
        {!articleProps.isFull
          ? articleProps?.isSmall
            ? articleProps.text.slice(0, 100)
            : articleProps.text.slice(0, 400)
          : articleProps.text}
      </Typography>
      {!articleProps.isSmall && articleProps.mediaUrls.length !== 0 ? (
        <MediaPreview mediaUrls={articleProps.mediaUrls} />
      ) : null}
    </>
  );
};
