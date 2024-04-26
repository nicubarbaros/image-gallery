import { Variants } from "framer-motion";

export const opacityVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const transitionDefault = { duration: 0.5, ease: "easeInOut" };

export const transitionCubic = { duration: 0.5, ease: [0.77, 0, 0.175, 1] };
