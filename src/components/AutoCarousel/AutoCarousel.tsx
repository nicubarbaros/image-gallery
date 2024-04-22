"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SampleDataType } from "@/sampleData";
import useWindowSize from "@/hooks/useWindowSize";
import "./style.scss";

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 400;

type Props = {
  interval?: number;
  animationDuration?: number;
  data: SampleDataType;
  activeIndex: number;
  setIndex: (newIndex: number) => void;
};

export function AutoCarousel({ interval = 2000, animationDuration = 1, data, setIndex, activeIndex }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { width, height } = useWindowSize();
  useEffect(() => {
    const cycleImages = () => {
      console.log("afeafea");
      if (isAnimating) {
        return;
      }
      setIsAnimating(true);
      setIndex((activeIndex + 1) % data.length);
    };

    const intervalId = setInterval(cycleImages, interval);

    return () => clearInterval(intervalId);
  }, [isAnimating, interval, activeIndex]);

  // const handleNext = () => {
  //   if (isAnimating) return;

  //   setIsAnimating(true);
  //   setIndex((prev) => (prev + 1) % images.length);
  // };

  // const handlePrev = () => {
  //   if (isAnimating) return;
  //   console.log("Throttled action");
  //   setIsAnimating(true);
  //   setIndex((prev) => (prev - 1 + images.length) % images.length);
  // };

  // TODO: generate it based on sampleData size
  const positions = useMemo(
    () => [
      { x: width / 2 + IMAGE_WIDTH, y: -1 * (height / 2 + IMAGE_HEIGHT), opacity: 0 },
      { x: width / 2 - IMAGE_WIDTH / 2, y: -1 * (height / 2 - IMAGE_HEIGHT / 2) },
      { x: 0, y: 0, rotation: 1, scale: 1.5, text: true },
      { x: -1 * (width / 2 - IMAGE_WIDTH / 2), y: height / 2 - IMAGE_HEIGHT / 2 },
      { x: -1 * (width / 2 + IMAGE_WIDTH), y: height / 2 + IMAGE_HEIGHT, opacity: 0 },
    ],
    [width, height]
  );

  return (
    <div className="carousel-container relative w-full h-full flex justify-center items-center">
      {/* <AnimatePresence initial={false}> */}
      {data.map(({ url, text }, index) => (
        <motion.div
          key={url}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: positions[(index + activeIndex) % data.length].x,
            y: positions[(index + activeIndex) % data.length].y,
            opacity: positions[(index + activeIndex) % data.length].opacity ?? 1,
            scale: positions[(index + activeIndex) % data.length].scale ?? 1,
          }}
          transition={{ duration: animationDuration, ease: "easeInOut" }}
          className={`absolute w-[300px] h-[400px] p-2`}
          onAnimationComplete={() => {
            setIsAnimating(false);
          }}
        >
          <div className="relative w-full h-full">
            <Image src={url} alt={`Image`} fill className="border rounded border-black" />
          </div>
        </motion.div>
      ))}
      {/* </AnimatePresence> */}
      {/* <button className="absolute top-1/2 right-5 bg-gray-700 text-white p-2 rounded" onClick={handleNext}>
        Next
      </button> */}
    </div>
  );
}
