import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const FetchScrolledHOC = (
  component: React.FC,
  action: any,
  additionalCondition: boolean,
  restartingCondition?: any,
  payload?: any
) => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const dispatch = useDispatch();

  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > scrollPosition) {
      setSrollPosition(Math.round(position - (position % 100)));
    }
  };
  useEffect(() => {
    if (restartingCondition) {
      setSrollPosition(0);
    }
  }, [restartingCondition]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    if (
      windowHeight > 100 &&
      windowHeight - scrollPosition < 100 &&
      windowHeight - scrollPosition >= 0 &&
      additionalCondition
    ) {
      dispatch(action(payload));
    }
  }, [dispatch, additionalCondition, scrollPosition, windowHeight, action, payload]);
  return component;
};
