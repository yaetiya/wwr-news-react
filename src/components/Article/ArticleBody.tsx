import { Typography } from '@material-ui/core'
import React from 'react'
import WatchesIcon from "@material-ui/icons/Visibility";
import { articleProps } from './Article';

type TArticleBodyProps = {
    articleProps: articleProps;
    classes: any;
}

export const ArticleBody = ({articleProps, classes}:TArticleBodyProps) => {
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
                  : articleProps.text.slice(0, 900)
                : articleProps.text}
            </Typography>

            <div className={classes.watchesWrapper}>
              <Typography className={classes.watchesText}>
                {articleProps.watches}
              </Typography>
              <WatchesIcon className={classes.watchedIcon} />
            </div>
      </>  
    )
}
