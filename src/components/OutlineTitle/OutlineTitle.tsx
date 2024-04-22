import React, { useEffect } from "react";
import { Variants, motion } from "framer-motion";

import "./style.scss";

type Props = {
  text: string;
};

const variants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function OutlineTitle({ text }: Props) {
  return (
    <motion.div key={text} className="outline-title absolute w-screen h-screen grid place-items-center ">
      <motion.h1
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="outline-title-fill absolute font-tungsten font-semibold text-white text-[220px] uppercase"
      >
        {text}
      </motion.h1>
      <motion.h1
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="outline-title-stroke absolute font-tungsten font-semibold text-[220px] uppercase"
      >
        {text}
      </motion.h1>
    </motion.div>
  );
}
