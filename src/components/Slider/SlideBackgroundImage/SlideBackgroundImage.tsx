import Image from "next/image";
import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { opacityVariants, transitionDefault } from "@/globals";

type Props = {
  src: string;
  visible: boolean;
};

export function SlideBackgroundImage({ src, visible }: Props) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (visible) {
      controls.start("visible");
      return;
    }

    controls.start("hidden");
  }, [visible]);

  return (
    <motion.div key={src} initial="hidden" animate={controls} variants={opacityVariants} transition={transitionDefault}>
      <Image
        src={src}
        fill
        alt="Background active image"
        className="absolute top-0 right-0 left-0 bottom-0 object-cover scale-[1.2] blur-[40px] z-0"
      />
    </motion.div>
  );
}
