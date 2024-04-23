"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SampleDataType } from "@/sampleData";
import useWindowSize from "@/hooks/useWindowSize";
import "./style.scss";
import { FullBackgroundImage } from "../FullBackgroundImage";
import { OutlineTitle } from "../OutlineTitle";
import { FullTitle } from "../FullTitle";

const IMAGE_WIDTH = 248;
const IMAGE_HEIGHT = 330;

const ACTIVE_IMAGE_WIDTH = 512;
const ACTIVE_IMAGE_HEIGHT = 680;

type Props = {
  interval?: number;
  animationDuration?: number;
  data: SampleDataType;
  activeIndex: number;
  setIndex: (newIndex: number) => void;
};

export function AutoCarousel({ interval = 2000, animationDuration = 1.5, data, setIndex, activeIndex }: Props) {
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
      {
        x: width / 2 + IMAGE_WIDTH,
        y: -1 * (height / 2 + IMAGE_HEIGHT),
        opacity: 0,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      },
      {
        x: width / 2 - IMAGE_WIDTH / 2,
        y: -1 * (height / 2 - IMAGE_HEIGHT / 2),

        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      },
      {
        x: 0,
        y: 0,
        active: true,

        width: ACTIVE_IMAGE_WIDTH,
        height: ACTIVE_IMAGE_HEIGHT,
      },
      {
        x: -1 * (width / 2 - IMAGE_WIDTH / 2),
        y: height / 2 - IMAGE_HEIGHT / 2,

        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      },
      {
        x: -1 * (width / 2 + IMAGE_WIDTH),
        y: height / 2 + IMAGE_HEIGHT,
        opacity: 0,

        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      },
    ],
    [width, height]
  );

  return (
    <div className="carousel-container relative w-full h-full flex justify-center items-center bg-black">
      {/* <AnimatePresence initial={false}> */}
      {data.map(({ url, text }, index) => {
        const activeData = positions[(index + activeIndex) % data.length];
        return (
          <Fragment key={url}>
            {<FullBackgroundImage src={url} visible={!!activeData.active} />}
            <motion.div
              initial={{
                x: 0,
                y: 0,
                width: activeData.width,
                height: activeData.height,
              }}
              animate={{
                x: activeData.x,
                y: activeData.y,
                opacity: activeData.opacity ?? 1,
                width: activeData.width,
                height: activeData.height,
              }}
              transition={{ duration: animationDuration, ease: [0.77, 0, 0.175, 1] }}
              className={`absolute p-2 z-10`}
              onAnimationComplete={() => {
                setIsAnimating(false);
              }}
            >
              <OutlineTitle text={text} visible={!!activeData.active} />
              <div className="relative w-full h-full overflow-hidden">
                <FullTitle text={text} visible={!!activeData.active} />
                <Image src={url} alt={`Image`} fill className="border rounded border-black" />
              </div>
            </motion.div>
          </Fragment>
        );
      })}
      {/* </AnimatePresence> */}
      {/* <button className="absolute top-1/2 right-5 bg-gray-700 text-white p-2 rounded" onClick={handleNext}>
        Next
      </button> */}
    </div>
  );
}
