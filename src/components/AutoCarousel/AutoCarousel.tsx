"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { SampleDataType } from "@/sampleData";
import useWindowSize from "@/hooks/useWindowSize";
import "./style.scss";
import { SlideOutlineTitle } from "./SlideOutlineTitle";
import { SlideFullTitle } from "./SlideFullTitle";
import { SlideBackgroundImage } from "./SlideBackgroundImage";
import { format } from "date-fns";
import Link from "next/link";
import { SlideInfo } from "./SlideInfo";

const ASPECT_RATIO = 3 / 4;
const MAX_IMAGE_WIDTH = 248;
const MIN_IMAGE_WIDTH = 248;

const MAX_ACTIVE_IMAGE_WIDTH = 512;

const MIN_ACTIVE_IMAGE_WIDTH = 248;

type Props = {
  interval?: number;
  animationDuration?: number;
  data: SampleDataType;
};

const scaleVariants: Variants = {
  scaleUp: { scale: 1.1, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
  scaleDown: { scale: 0.9, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1], delay: 1 } },
  reset: { scale: 1 },
};

function calcTransforms({
  windowHeight,
  windowWidth,
  imageHeight,
  imageWidth,
  activeImageHeight,
  activeImageWidth,
}: {
  windowWidth: number;
  windowHeight: number;
  imageWidth: number;
  imageHeight: number;
  activeImageWidth: number;
  activeImageHeight: number;
}) {
  if (windowWidth < 768) {
    return [
      {
        x: windowWidth,
        y: 0,
        opacity: 0,
        width: imageWidth,
        height: imageHeight,
      },
      {
        x: windowWidth / 2,
        y: 0,
        width: imageWidth,
        height: imageHeight,
      },
      {
        x: 0,
        y: 0,
        active: true,
        width: activeImageWidth,
        height: activeImageHeight,
      },
      {
        x: -1 * (windowWidth / 2),

        y: 0,
        width: imageWidth,
        height: imageHeight,
      },
      {
        x: -1 * windowWidth,
        y: 0,
        opacity: 0,

        width: imageWidth,
        height: imageHeight,
      },
    ];
  }
  return [
    {
      x: windowWidth / 2 + imageWidth,
      y: -1 * (windowHeight / 2 + imageHeight),
      opacity: 0,
      width: imageWidth,
      height: imageHeight,
    },
    {
      x: windowWidth / 2 - imageWidth / 2,
      y: -1 * (windowHeight / 2 - imageHeight / 2),

      width: imageWidth,
      height: imageHeight,
    },
    {
      x: 0,
      y: 0,
      active: true,

      width: activeImageWidth,
      height: activeImageHeight,
    },
    {
      x: -1 * (windowWidth / 2 - imageWidth / 2),
      y: windowHeight / 2 - imageHeight / 2,

      width: imageWidth,
      height: imageHeight,
    },
    {
      x: -1 * (windowWidth / 2 + imageWidth),
      y: windowHeight / 2 + imageHeight,
      opacity: 0,

      width: imageWidth,
      height: imageHeight,
    },
  ];
}
export function AutoCarousel({ interval = 2000, animationDuration = 1.5, data }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { width, height } = useWindowSize();
  // useEffect(() => {
  //   const cycleImages = () => {
  //     if (isAnimating) {
  //       return;
  //     }
  //     setIsAnimating(true);
  //     setActiveIndex((activeIndex + 1) % data.length);
  //   };

  //   const intervalId = setInterval(cycleImages, interval);

  //   return () => clearInterval(intervalId);
  // }, [isAnimating, interval, activeIndex]);

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

  const normalizedWidth = useMemo(
    () => Math.ceil(Math.max(Math.min(MAX_IMAGE_WIDTH, width * 0.5), MIN_IMAGE_WIDTH)),
    [width]
  );

  const normalizedHeight = useMemo(() => Math.ceil(normalizedWidth / ASPECT_RATIO), [normalizedWidth]);

  const normalizedActiveWidth = useMemo(
    () => Math.ceil(Math.max(Math.min(MAX_ACTIVE_IMAGE_WIDTH, width * 0.5), MIN_ACTIVE_IMAGE_WIDTH)),
    [width]
  );
  const normalizedActiveHeight = useMemo(
    () => Math.ceil(normalizedActiveWidth / ASPECT_RATIO),
    [normalizedActiveWidth]
  );

  // TODO: generate it based on sampleData size
  const transforms = useMemo(
    () =>
      calcTransforms({
        windowWidth: width,
        windowHeight: height,
        imageWidth: normalizedWidth,
        imageHeight: normalizedHeight,
        activeImageWidth: normalizedActiveWidth,
        activeImageHeight: normalizedActiveHeight,
      }),
    [width, height, normalizedActiveHeight, normalizedActiveWidth, normalizedHeight, normalizedWidth]
  );

  // const scaleUpControls = useAnimationControls();
  // const scaleDownControls = useAnimationControls();

  // const handleHoverStart = () => {
  //   scaleUpControls.start("scaleUp");
  //   scaleDownControls.start("scaleDown");
  // };
  // const handleHoverEnd = () => {
  //   scaleUpControls.start("reset");
  //   scaleDownControls.start("reset");
  // };
  return (
    <div className="carousel-container relative w-full h-full flex justify-center items-center bg-black">
      {/* <AnimatePresence initial={false}> */}
      {data.map(({ url, text, author, client, date, slug }, index) => {
        const activeData = transforms[(index + activeIndex) % data.length];
        return (
          <Fragment key={url}>
            <SlideBackgroundImage src={url} visible={!!activeData.active} />
            <motion.div
              initial={{
                x: 0,
                y: 0,
                width: activeData.width,
                height: activeData.height,
                filter: "grayscale(0.5)",
                zIndex: 10 * (index + 1),
              }}
              animate={{
                x: activeData.x,
                y: activeData.y,
                opacity: activeData.opacity ?? 1,
                width: activeData.width,
                height: activeData.height,
                filter: "grayscale(0)",
              }}
              transition={{ duration: animationDuration, ease: [0.77, 0, 0.175, 1] }}
              className={`absolute p-2`}
              onAnimationComplete={() => {
                setIsAnimating(false);
              }}
              // onHoverStart={handleHoverStart}
              // onHoverEnd={handleHoverEnd}
            >
              <SlideOutlineTitle text={text} visible={!!activeData.active} />
              <motion.div
                className="relative w-full h-full overflow-hidden"
                // animate={scaleDownControls}
                variants={scaleVariants}
              >
                <SlideFullTitle text={text} visible={!!activeData.active} />
                {/* <motion.div
                  // animate={scaleUpControls}
                  variants={scaleVariants}
                  // whileHover={{ scale: 1.5 }}
                  className="relative w-full h-full"
                  // transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                > */}
                <Image src={url} alt={`Image`} fill className="border rounded border-black" />
                {/* </motion.div> */}
              </motion.div>
            </motion.div>

            {activeData.active && <SlideInfo slug={slug} author={author} client={client} date={date} />}
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
