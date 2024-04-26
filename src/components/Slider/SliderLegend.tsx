import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { opacityVariants, transitionDefault } from "@/globals";

type Props = {
  counter: number;
  current: number;
};

export function SliderLegend({ counter, current }: Props) {
  const iterableArray = useMemo(() => Array.from<number>({ length: counter }).fill(0), [counter]);

  const indicators = iterableArray.map((_, index) => (
    <motion.div
      key={index}
      initial={{
        background: "transparent",
      }}
      animate={{
        background: index === current ? "white" : "transparent",
      }}
      className="w-[5px] h-[8px] border-[1px] rounded-sm border-white"
    />
  ));

  return (
    <motion.div
      className="flex items-center gap-6"
      initial="hidden"
      animate="visible"
      variants={opacityVariants}
      transition={transitionDefault}
    >
      <div className="font-helvetica text-[10px] uppercase text-white">
        {current + 1} of {counter}
      </div>
      <div className="flex gap-2">{indicators}</div>
    </motion.div>
  );
}
