import { format } from "date-fns";
import Link from "next/link";
import React from "react";

type Props = {
  author: string;
  client: string;
  date: Date;
  slug: string;
};
export function SlideInfo({ author, client, date, slug }: Props) {
  return (
    <div className="slide-description flex flex-col gap-4  fixed right-[4vw] bottom-[40px]  w-[109px]  z-10">
      <div>
        <p className="text-white font-helvetica uppercase size text-[10px]">{author}</p>
        <p className="text-white font-helvetica uppercase size text-[10px]">for {client}</p>
      </div>
      <p className="ml-auto text-white font-helvetica uppercase text-[10px]">{format(date, "MMM y")}</p>

      <Link
        href={slug}
        className="bg-white text-black rounded-2xl uppercase px-4 py-2  font-helvetica text-[10px] font-bold text-center"
      >
        Have a look
      </Link>
    </div>
  );
}
