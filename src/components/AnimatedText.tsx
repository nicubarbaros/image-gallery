import React from "react";

import { Variants, motion } from "framer-motion";

type Props = {
  children: JSX.Element;
  delay?: number;
};

const variants: Variants = {
  hide: {
    y: 100,
  },
  show: {
    y: 0,
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
          duration: 0.5,
          ease: "easeInOut",
          delay: delayInSeconds,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
