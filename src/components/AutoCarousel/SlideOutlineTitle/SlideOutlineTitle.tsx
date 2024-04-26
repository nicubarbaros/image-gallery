import React, { useEffect } from "react";
import { Variants, motion, useAnimationControls } from "framer-motion";

import "./style.scss";

type Props = {
  text: string;
  visible: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1], delay: 1 } },
};

export function SlideOutlineTitle({ text, visible }: Props) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (visible) {
      controls.start("visible");
      return;
    }

    controls.start("hidden");
  }, [visible]);

  return (
    <motion.div className="outline-title absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%]">
      <motion.h1
        initial="hidden"
        animate={controls}
        exit="hidden"
        variants={variants}
        className="outline-title-stroke font-tungsten font-semibold uppercase"
      >
        {text}
      </motion.h1>
    </motion.div>
  );
}
