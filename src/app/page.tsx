"use client";
import { sampleData } from "@/sampleData";
import { AutoCarousel } from "./AutoCarousel";
import { useMemo, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeIndex, setIndex] = useState(1);

  const rearrangeArray = useMemo(() => {
    const [first, ...rest] = sampleData;

    const middleIndex = rest.length % 2 === 0 ? Math.floor(rest.length / 2) : Math.floor(rest.length / 2) + 1;

    return [...rest.slice(0, middleIndex - 1), first, ...rest.slice(middleIndex - 1)];
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* <button className="absolute top-1/2 left-5 bg-gray-700 text-white p-2 rounded z-10" onClick={handlePrev}>
		Prev
	</button> */}
      <Image
        src={rearrangeArray[activeIndex].url}
        fill
        alt="Background active image"
        className="absolute top-0 right-0 left-0 bottom-0 object-cover blur-[40px] scale-[1.2]"
      />
      <AutoCarousel data={rearrangeArray} activeIndex={activeIndex} setIndex={setIndex} />;
    </div>
  );
}
