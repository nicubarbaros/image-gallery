"use client";

import React from "react";
import { AnimatedText } from "./AnimatedText";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className="fixed top-4 left-8 z-50 font-tungsten font-semibold uppercase text-[16px]">
      <AnimatedText key={pathname}>
        {pathname === "/" ? (
          <p className="text-white">XYZ Photography</p>
        ) : (
          <Link href={"/"} className="text-black">
            Back
          </Link>
        )}
      </AnimatedText>
    </div>
  );
}
