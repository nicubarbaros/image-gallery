import Image from "next/image";
import React, { useEffect } from "react";
import { Variants, motion, useAnimationControls } from "framer-motion";

type Props = {
  src: string;
  visible: boolean;
};

const variants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export function FullBackgroundImage({ src, visible }: Props) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (visible) {
      controls.start("visible");
      return;
    }

    controls.start("hidden");
  }, [visible]);

  return (
    <motion.div
      key={src}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Image
        src={src}
        fill
        alt="Background active image"
        className="absolute top-0 right-0 left-0 bottom-0 object-cover scale-[1.2] blur-[40px] z-0"
      />
    </motion.div>
  );
}
