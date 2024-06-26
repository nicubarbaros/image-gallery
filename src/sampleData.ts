export type SampleDataItem = {
  slug: string;
  url: string;
  text: string;
  author: string;
  client: string;
  date: Date;
};
export type SampleDataType = SampleDataItem[];

export const sampleData: SampleDataType = [
  {
    slug: "everyday-flowers",
    url: "/assets/images/image01.jpg",
    text: "Everyday flowers",
    author: "Johanna Nobel",
    client: "Vouge",
    date: new Date("2019-06-19"),
  },
  {
    slug: "smooth-memories",
    url: "/assets/images/image03.jpg",
    text: "Smooth memories",
    author: "Johanna Nobel",
    client: "Chanel",
    date: new Date("2020-02-01"),
  },
  {
    slug: "the-wilder-nights",
    url: "/assets/images/image02.jpg",
    text: "The wilder nights",
    author: "Johanna Nobel",
    client: "Wild",
    date: new Date("2019-12-19"),
  },
  {
    slug: "the-future-universe",
    url: "/assets/images/image04.jpg",
    text: "The future universe",
    author: "Johanna Nobel",
    client: "On",
    date: new Date("2020-04-01"),
  },
  {
    slug: "born-urban",
    url: "/assets/images/image05.jpg",
    text: "She was born Urban",
    author: "Johanna Nobel",
    client: "Si",
    date: new Date("2021-12-01"),
  },
];
