"use client";
import { sampleData } from "@/sampleData";
import Image from "next/image";
import { format } from "date-fns";
import { Variants, motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { opacityVariants, transitionCubic } from "@/globals";

function getPageData(slug: string) {
  return sampleData.find((sample) => sample.slug === slug);
}
export default function Page({ params }: { params: { slug: string } }) {
  const data = getPageData(params.slug);

  if (!data) return null;

  return (
    <div className="relative w-screen h-screen grid grid-cols-[auto_60%_1fr] gap-9 text-black">
      <div className="col-start-2 col-span-1 flex flex-col justify-end py-9">
        <AnimatedText>
          <h1 className="font-tungsten font-semibold uppercase text-[180px] text-balance leading-none">{data.text}</h1>
        </AnimatedText>
        <div className="flex gap-4 items-center text-[24px] ">
          <AnimatedText delay={150}>
            <p className="italic mr-1 font-tungsten">
              {data.author} for {data.client}
            </p>
          </AnimatedText>
          <AnimatedText delay={200}>
            <p className="text-gray-500 font-helvetica">/ {format(data.date, "y-d")}</p>
          </AnimatedText>
        </div>
      </div>
      <div className="relative col-span-1">
        <motion.div initial="hidden" animate="visible" variants={opacityVariants} transition={transitionCubic}>
          <Image src={data.url} alt={`Image`} fill objectFit="cover" />
        </motion.div>
      </div>
    </div>
  );
}
