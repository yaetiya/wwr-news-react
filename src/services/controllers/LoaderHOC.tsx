import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loading } from "../../components/Loading";

export const LoaderHOC = () => {
  const location = useLocation();
  const afterComponent = (Component: React.FC) => {
    return Component;
  };
  const preloadComponent = (_: React.FC) => {
    return Loading;
  };
  useEffect(() => {
    setResultType("LOADER");
    resetTimeout();
  }, [location.pathname]);
  const [resultType, setResultType] = useState("LOADER");
  const resetTimeout = () => {
    setTimeout(() => {
      setResultType("COMPONENT");
    }, 1000);
  };
  resetTimeout();
  switch (resultType) {
    case "LOADER":
      return preloadComponent;
    case "COMPONENT":
      return afterComponent;
    default:
      return preloadComponent;
  }
};
