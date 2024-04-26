"use client";
import { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SampleDataType } from "@/sampleData";
import useWindowSize from "@/hooks/useWindowSize";
import { SlideOutlineTitle } from "./SlideOutlineTitle";
import { SlideFullTitle } from "./SlideFullTitle";
import { SlideBackgroundImage } from "./SlideBackgroundImage";
import { SlideInfo } from "./SlideInfo";
import { SliderConfig } from "./config";
import { SliderLegend } from "./SliderLegend";
import { CursorContext } from "../CustomCursor/CursorManager";
import { transitionDefault } from "@/globals";

import "./style.scss";

const TABLET_SIZE = 768;

const MAX_IMAGE_WIDTH = 248;
const MIN_IMAGE_WIDTH = 248;

const MAX_ACTIVE_IMAGE_WIDTH = 512;
const MIN_ACTIVE_IMAGE_WIDTH = 248;

type Props = {
  interval?: number;
  animationDuration?: number;
  data: SampleDataType;
};

export function Slider({ interval = 2000, animationDuration = 1.5, data }: Props) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setTotal, setCurrentIndex } = useContext(CursorContext);

  const { width, height } = useWindowSize();
  const isTablet = width < TABLET_SIZE;

  const slidesLength = data.length;

  // Initial animation
  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(false);
    }, interval);
  }, [interval]);

  // Nr of slides for custom cursor
  useEffect(() => {
    setTotal(slidesLength);
  }, [slidesLength, setTotal]);

  // Current index for custom cursor
  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex, setCurrentIndex]);

  const changeSlide = useCallback(
    (change: number) => {
      if (isAnimating) return;

      setIsAnimating(true);
      setActiveIndex((activeIndex + change + slidesLength) % slidesLength);

      setTimeout(() => {
        setIsAnimating(false);
      }, interval);
    },
    [isAnimating, activeIndex, slidesLength, interval]
  );

  const handleNext = useCallback(() => {
    changeSlide(1);
  }, [changeSlide]);

  const handlePrev = useCallback(() => {
    changeSlide(-1);
  }, [changeSlide]);

  // Enable auto-scroll on mobile on mobile
  useEffect(() => {
    if (!isTablet) return;

    const intervalId = setInterval(handleNext, interval);

    return () => clearInterval(intervalId);
  }, [isAnimating, interval, activeIndex, slidesLength, isTablet, handleNext]);

  // Normalized image width based on screen size
  const normalizedWidth = useMemo(
    () => SliderConfig.clampWidth({ windowWidth: width, maxWidth: MAX_IMAGE_WIDTH, minWidth: MIN_IMAGE_WIDTH }),
    [width]
  );

  // Normalized image height based on ratio
  const normalizedHeight = useMemo(() => SliderConfig.aspectRatio(normalizedWidth), [normalizedWidth]);

  // Normalized active image width based on screen size
  const normalizedActiveWidth = useMemo(
    () =>
      SliderConfig.clampWidth({
        windowWidth: width,
        maxWidth: MAX_ACTIVE_IMAGE_WIDTH,
        minWidth: MIN_ACTIVE_IMAGE_WIDTH,
      }),
    [width]
  );

  // Normalized active image height based on ratio
  const normalizedActiveHeight = useMemo(
    () => SliderConfig.aspectRatio(normalizedActiveWidth),
    [normalizedActiveWidth]
  );

  const transforms = useMemo(
    () =>
      SliderConfig.calcTransforms({
        windowWidth: width,
        windowHeight: height,
        imageWidth: normalizedWidth,
        imageHeight: normalizedHeight,
        activeImageWidth: normalizedActiveWidth,
        activeImageHeight: normalizedActiveHeight,
        isTablet,
      }),
    [width, height, normalizedActiveHeight, normalizedActiveWidth, normalizedHeight, normalizedWidth, isTablet]
  );

  return (
    <div className="carousel-container relative w-full h-full flex justify-center items-center bg-black">
      {data.map(({ url, text, author, client, date, slug }, index) => {
        const activeData = transforms[(index + activeIndex) % slidesLength];
        return (
          <Fragment key={url}>
            <SlideBackgroundImage src={url} visible={!!activeData.current} />
            <motion.div
              className="absolute"
              initial={{
                x: 0,
                y: 0,
                width: activeData.width,
                height: activeData.height,
                zIndex: 10 * (index + 1),
              }}
              animate={{
                x: activeData.x,
                y: activeData.y,
                opacity: activeData.opacity ?? 1,
                width: activeData.width,
                height: activeData.height,
              }}
              transition={{ duration: animationDuration, ease: [0.77, 0, 0.175, 1] }}
              whileHover={
                activeData.current
                  ? {}
                  : {
                      scale: 0.9,
                      transition: transitionDefault,
                    }
              }
              onClick={() => {
                if (activeData.previous) {
                  handlePrev();
                }
                if (activeData.next) {
                  handleNext();
                }
              }}
            >
              <SlideOutlineTitle text={text} visible={!!activeData.current && !isAnimating} />
              <motion.div className="relative w-full h-full overflow-hidden border rounded-[10px] border-black">
                <SlideFullTitle text={text} visible={!!activeData.current && !isAnimating} />
                <motion.div
                  whileHover={activeData.current ? {} : { scale: 1.2, transition: transitionDefault }}
                  className="relative w-full h-full"
                  transition={{ duration: animationDuration, ease: [0.77, 0, 0.175, 1] }}
                >
                  <Image src={url} alt={`Image`} fill />
                </motion.div>
              </motion.div>

              {activeData.current && !isAnimating && (
                <div className="absolute left-[50%] translate-x-[-50%] bottom-[10%]">
                  <SliderLegend counter={slidesLength} current={activeIndex} />
                </div>
              )}
            </motion.div>

            {activeData.current && !isAnimating && (
              <SlideInfo slug={slug} author={author} client={client} date={date} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
