import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export const Loading: React.FC = (): React.ReactElement => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 50;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
};
