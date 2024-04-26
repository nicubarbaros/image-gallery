"use client";
import { sampleData } from "@/sampleData";
import Image from "next/image";
import { format } from "date-fns";
import { Variants, motion } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
};

function getPageData(slug: string) {
  return sampleData.find((sample) => sample.slug === slug);
}
export default function Page({ params }: { params: { slug: string } }) {
  const data = getPageData(params.slug);

  if (!data) return null;

  return (
    <div className="relative w-screen h-screen grid grid-cols-[auto_60%_1fr] gap-9">
      <div className="col-start-2 col-span-1 flex flex-col justify-end py-9">
        <h1 className="font-tungsten font-semibold uppercase text-[180px] text-balance leading-none">{data.text}</h1>
        <div className="flex gap-6 items-center text-[24px] font-tungsten">
          <p className="italic">
            {data.author} for {data.client}
          </p>
          <p className="text-gray-500">/ {format(data.date, "y-d")}</p>
        </div>
      </div>
      <div className="relative col-span-1">
        <motion.div initial="hidden" animate="visible" variants={variants}>
          <Image src={data.url} alt={`Image`} fill objectFit="cover" />
        </motion.div>
      </div>
    </div>
  );
}
