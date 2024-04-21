import { useEffect, useState } from "react";

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize);
  useEffect(() => {
    const resizeListener = () => setWindowSize(getWindowSize);

    window.addEventListener("resize", resizeListener);

    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return windowSize;
};

export default useWindowSize;
