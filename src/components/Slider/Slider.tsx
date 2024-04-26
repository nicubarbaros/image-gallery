"use client";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
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

import "./style.scss";

type Props = {
  interval?: number;
  animationDuration?: number;
  data: SampleDataType;
};
const MAX_IMAGE_WIDTH = 248;
const MIN_IMAGE_WIDTH = 248;

const MAX_ACTIVE_IMAGE_WIDTH = 512;
const MIN_ACTIVE_IMAGE_WIDTH = 248;

export function Slider({ interval = 2000, animationDuration = 1.5, data }: Props) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const { setTotal, setCurrentIndex } = useContext(CursorContext);

  const { width, height } = useWindowSize();
  useEffect(() => {
    setTimeout(() => {
      setIsAnimating(false);
    }, interval);
  }, [interval]);

  useEffect(() => {
    setTotal(data.length);
  }, [data.length, setTotal]);

  useEffect(() => {
    setCurrentIndex(activeIndex);
  }, [activeIndex, setCurrentIndex]);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((activeIndex + 1) % data.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, interval);
  };

  const handlePrev = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveIndex((activeIndex - 1 + data.length) % data.length);

    setTimeout(() => {
      setIsAnimating(false);
    }, interval);
  };

  const normalizedWidth = useMemo(
    () => SliderConfig.clampWidth({ windowWidth: width, maxWidth: MAX_IMAGE_WIDTH, minWidth: MIN_IMAGE_WIDTH }),
    [width]
  );

  const normalizedHeight = useMemo(() => SliderConfig.aspectRatio(normalizedWidth), [normalizedWidth]);

  const normalizedActiveWidth = useMemo(
    () =>
      SliderConfig.clampWidth({
        windowWidth: width,
        maxWidth: MAX_ACTIVE_IMAGE_WIDTH,
        minWidth: MIN_ACTIVE_IMAGE_WIDTH,
      }),
    [width]
  );
  const normalizedActiveHeight = useMemo(
    () => SliderConfig.aspectRatio(normalizedActiveWidth),
    [normalizedActiveWidth]
  );

  // TODO: generate it based on sampleData size
  const transforms = useMemo(
    () =>
      SliderConfig.calcTransforms({
        windowWidth: width,
        windowHeight: height,
        imageWidth: normalizedWidth,
        imageHeight: normalizedHeight,
        activeImageWidth: normalizedActiveWidth,
        activeImageHeight: normalizedActiveHeight,
      }),
    [width, height, normalizedActiveHeight, normalizedActiveWidth, normalizedHeight, normalizedWidth]
  );

  return (
    <div className="carousel-container relative w-full h-full flex justify-center items-center bg-black">
      {data.map(({ url, text, author, client, date, slug }, index) => {
        const activeData = transforms[(index + activeIndex) % data.length];
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
                  whileHover={activeData.current ? {} : { scale: 1.5 }}
                  className="relative w-full h-full"
                  transition={{ duration: animationDuration, ease: [0.77, 0, 0.175, 1] }}
                >
                  <Image src={url} alt={`Image`} fill />
                </motion.div>
              </motion.div>

              {activeData.current && !isAnimating && (
                <div className="absolute left-[50%] translate-x-[-50%] bottom-[10%]">
                  <SliderLegend counter={data.length} current={activeIndex} />
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
