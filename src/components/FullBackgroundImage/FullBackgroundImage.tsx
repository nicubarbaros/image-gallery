import Image from "next/image";
import React from "react";
import "./style.scss";

type Props = {
  src: string;
};
export function FullBackgroundImage({ src }: Props) {
  return (
    <Image
      src={src}
      fill
      alt="Background active image"
      className="full-background-image absolute top-0 right-0 left-0 bottom-0 object-cover blur-[40px] scale-[1.2]"
    />
  );
}
