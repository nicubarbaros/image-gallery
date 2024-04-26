const ASPECT_RATIO = 3 / 4;

const BORDER_PADDING = 16;

export const SliderConfig = {
  calcTransforms({
    windowHeight,
    windowWidth,
    imageHeight,
    imageWidth,
    activeImageHeight,
    activeImageWidth,
    isTablet,
  }: {
    windowWidth: number;
    windowHeight: number;
    imageWidth: number;
    imageHeight: number;
    activeImageWidth: number;
    activeImageHeight: number;
    isTablet: boolean;
  }) {
    if (isTablet) {
      return [
        {
          x: windowWidth,
          y: 0,
          opacity: 0,
          width: imageWidth,
          height: imageHeight,
        },
        {
          x: windowWidth / 2 + imageWidth * 0.4,
          y: 0,
          width: imageWidth,
          height: imageHeight,
          next: true,
        },
        {
          x: 0,
          y: 0,
          current: true,
          width: activeImageWidth,
          height: activeImageHeight,
        },
        {
          x: -1 * (windowWidth / 2 + imageWidth * 0.4),
          y: 0,
          width: imageWidth,
          height: imageHeight,
          previous: true,
        },
        {
          x: -1 * windowWidth,
          y: 0,
          opacity: 0,

          width: imageWidth,
          height: imageHeight,
        },
      ];
    }
    return [
      {
        x: windowWidth / 2 + imageWidth,
        y: -1 * (windowHeight / 2 + imageHeight),
        opacity: 0,
        width: imageWidth,
        height: imageHeight,
      },
      {
        x: windowWidth / 2 - imageWidth / 2 - BORDER_PADDING,
        y: -1 * (windowHeight / 2 - imageHeight / 2) + BORDER_PADDING,
        next: true,
        width: imageWidth,
        height: imageHeight,
      },
      {
        x: 0,
        y: 0,
        current: true,
        width: activeImageWidth,
        height: activeImageHeight,
      },
      {
        x: -1 * (windowWidth / 2 - imageWidth / 2) + BORDER_PADDING,
        y: windowHeight / 2 - imageHeight / 2 - BORDER_PADDING,

        width: imageWidth,
        height: imageHeight,
        previous: true,
      },
      {
        x: -1 * (windowWidth / 2 + imageWidth),
        y: windowHeight / 2 + imageHeight,
        opacity: 0,

        width: imageWidth,
        height: imageHeight,
      },
    ];
  },
  clampWidth({ windowWidth, maxWidth, minWidth }: { windowWidth: number; minWidth: number; maxWidth: number }) {
    const ratio = 0.5;
    return Math.ceil(Math.max(Math.min(maxWidth, windowWidth * ratio), minWidth));
  },
  aspectRatio(width: number) {
    return Math.ceil(width / ASPECT_RATIO);
  },
};
