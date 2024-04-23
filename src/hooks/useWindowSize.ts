import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const getWindowSize = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    setWindowSize(getWindowSize);

    const resizeListener = () => setWindowSize(getWindowSize);

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return windowSize;
};

export default useWindowSize;
