"use client";
import { sampleData } from "@/sampleData";
import { useMemo } from "react";
import { Slider } from "@/components/Slider";

export default function Home() {
  const rearrangeArray = useMemo(() => {
    const [first, ...rest] = sampleData;

    const middleIndex = rest.length % 2 === 0 ? Math.floor(rest.length / 2) : Math.floor(rest.length / 2) + 1;

    return [...rest.slice(0, middleIndex - 1), first, ...rest.slice(middleIndex - 1)];
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <Slider data={rearrangeArray} />;
    </div>
  );
}
