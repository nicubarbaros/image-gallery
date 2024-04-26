import React from "react";

import { Variants, motion } from "framer-motion";
import { opacityVariants, transitionDefault } from "@/globals";

type Props = {
  children: JSX.Element;
  delay?: number;
};

const variants: Variants = {
  hide: {
    y: 100,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

export function AnimatedText({ children, delay }: Props) {
  const delayInSeconds = delay ? delay / 1000 : 0;
  return (
    <div className="overflow-hidden">
      <motion.div
        variants={variants}
        initial="hide"
        animate="show"
        transition={{
          ...transitionDefault,
          delay: delayInSeconds,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
