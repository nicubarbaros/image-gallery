import React, { useEffect } from "react";
import { Variants, motion, useAnimationControls } from "framer-motion";

import "./style.scss";
import { opacityVariants, transitionCubic } from "@/globals";

type Props = {
  text: string;
  visible: boolean;
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
    <motion.div className="outline-title absolute left-2/4 top-2/4 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
      <motion.h1
        initial="hidden"
        animate={controls}
        exit="hidden"
        variants={opacityVariants}
        transition={transitionCubic}
        className="outline-title-stroke font-tungsten font-semibold uppercase"
      >
        {text}
      </motion.h1>
    </motion.div>
  );
}
