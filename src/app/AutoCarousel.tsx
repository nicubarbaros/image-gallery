"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Image from "next/image";
import useWindowSize from "../hooks/useWindowSize";

const images = [
  "/assets/images/image01.jpg",
  "/assets/images/image02.jpg",
  "/assets/images/image03.jpg",
  "/assets/images/image04.jpg",
  "/assets/images/image05.jpg",
];

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 400;

type Props = {
  interval?: number;
  animationDuration?: number;
};

export function AutoCarousel({ interval = 2000, animationDuration = 1 }: Props) {
  const [centerImageIndex, setIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const { width, height } = useWindowSize();
  useEffect(() => {
    const cycleImages = () => {
      if (isAnimating) {
        return;
      }
      setIsAnimating(true);
      setIndex((prev) => (prev + 1) % images.length);
    };

    const intervalId = setInterval(cycleImages, interval);

    return () => clearInterval(intervalId);
  }, [isAnimating, interval]);

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

  const rearrangeArray = useMemo(() => {
    // Original array

    // Get the first element and the rest of the array
    const [first, ...rest] = images;

    console.log(first);
    // Calculate the middle index
    const middleIndex = rest.length % 2 === 0 ? Math.floor(rest.length / 2) : Math.floor(rest.length / 2) + 1;

    console.log(middleIndex);
    // Create the new array by placing the first element in the middle
    return [...rest.slice(0, middleIndex - 1), first, ...rest.slice(middleIndex - 1)];
  }, []);

  const positions = [
    { x: width / 2 + IMAGE_WIDTH, y: -1 * (height / 2 + IMAGE_HEIGHT), opacity: 0 },
    { x: width / 2 - IMAGE_WIDTH / 2, y: -1 * (height / 2 - IMAGE_HEIGHT / 2) },
    { x: 0, y: 0, rotation: 1, scale: 1.5 },
    { x: -1 * (width / 2 - IMAGE_WIDTH / 2), y: height / 2 - IMAGE_HEIGHT / 2 },
    { x: -1 * (width / 2 + IMAGE_WIDTH), y: height / 2 + IMAGE_HEIGHT, opacity: 0 },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* <button className="absolute top-1/2 left-5 bg-gray-700 text-white p-2 rounded z-10" onClick={handlePrev}>
        Prev
      </button> */}
      <Image
        src={rearrangeArray[centerImageIndex]}
        fill
        alt="Background active image"
        className="absolute top-0 right-0 left-0 bottom-0 object-cover blur-[40px] scale-[1.2]"
      />
      <div className="relative w-full h-full flex justify-center items-center">
        {/* <AnimatePresence initial={false}> */}
        {rearrangeArray.map((imageSource, index) => (
          <motion.div
            key={imageSource}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: positions[(index + centerImageIndex) % images.length].x,
              y: positions[(index + centerImageIndex) % images.length].y,
              opacity: positions[(index + centerImageIndex) % images.length].opacity ?? 1,
              scale: positions[(index + centerImageIndex) % images.length].scale ?? 1,
            }}
            transition={{ duration: animationDuration, ease: "easeInOut" }}
            className={`absolute w-[300px] h-[400px] p-2`}
            onAnimationComplete={() => {
              setIsAnimating(false);
            }}
          >
            <div className="relative w-full h-full">
              <Image src={imageSource} alt={`Image`} fill className="border rounded border-black" />
            </div>
          </motion.div>
        ))}
        {/* </AnimatePresence> */}
      </div>
      {/* <button className="absolute top-1/2 right-5 bg-gray-700 text-white p-2 rounded" onClick={handleNext}>
        Next
      </button> */}
    </div>
  );
}
