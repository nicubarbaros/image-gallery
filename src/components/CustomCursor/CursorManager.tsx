"use client";
import React, { createContext, useState } from "react";

export const CursorContext = createContext<{
  total: number;
  currentIndex: number;
  setTotal: (value: number) => void;
  setCurrentIndex: (value: number) => void;
}>({
  total: 0,
  currentIndex: 0,
  setTotal: () => {},
  setCurrentIndex: () => {},
});

type Props = {
  children: React.ReactNode;
};

export function CursorManager(props: Props) {
  const [total, setTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <CursorContext.Provider value={{ total, setTotal, setCurrentIndex, currentIndex }}>
      {props.children}
    </CursorContext.Provider>
  );
}
