"use client";
import React, { useContext, useMemo } from "react";
import { CursorContext } from "./CursorManager";
import "./style.scss";
import { motion } from "framer-motion";
import { transitionDefault } from "@/globals";

const radius = 21;
const circumference = 2 * Math.PI * radius;

export const CustomCursor = () => {
  const { total, currentIndex } = useContext(CursorContext);
  const cursorElement = React.useRef<HTMLDivElement>(null);

  const positionRef = React.useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  React.useEffect(() => {
    document.addEventListener("mousemove", (event) => {
      if (!cursorElement.current) return;

      const { clientX, clientY } = event;

      const mouseX = clientX;
      const mouseY = clientY;

      positionRef.current.mouseX = mouseX - cursorElement.current.clientWidth / 2;
      positionRef.current.mouseY = mouseY - cursorElement.current.clientHeight / 2;
    });

    return () => {};
  }, []);

  React.useEffect(() => {
    const followMouse = () => {
      if (!cursorElement.current) return;

      positionRef.current.key = requestAnimationFrame(followMouse);
      const { mouseX, mouseY, destinationX, destinationY, distanceX, distanceY } = positionRef.current;
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        if (Math.abs(positionRef.current.distanceX) + Math.abs(positionRef.current.distanceY) < 0.1) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      cursorElement.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
    };
    followMouse();
  }, []);

  const newOffset = useMemo(() => {
    if (!currentIndex) return circumference;

    return circumference - (currentIndex * circumference) / total;
  }, [currentIndex, total]);

  return (
    <div className="cursor-wrapper">
      <div className="secondary-cursor relative" ref={cursorElement}>
        <svg width="42" height="42" viewBox="0 0 42 42">
          <motion.circle
            cx="21"
            cy="21"
            r={radius}
            stroke="white"
            strokeWidth="2"
            fill="none"
            initial={{
              rotate: "-90deg",
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: circumference,
            }}
            animate={{ strokeDashoffset: newOffset }}
            transition={transitionDefault}
          />
        </svg>
        <svg width="42" height="42" viewBox="0 0 42 42" className="absolute top-0 -z-10">
          <motion.circle
            cx="21"
            cy="21"
            r={radius}
            stroke="gray"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
          />
        </svg>

        <svg width="42" height="42" viewBox="0 0 42 42" className="absolute top-0 -z-10">
          <motion.circle cx="21" cy="21" r={4} fill="white" />
        </svg>
      </div>
    </div>
  );
};
