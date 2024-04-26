import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../stylesheets/root.scss";
import Header from "@/components/Header";
import { CustomCursor } from "@/components/CustomCursor";
import { CursorManager } from "@/components/CustomCursor/CursorManager";

const tungsten = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Tungsten-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/assets/fonts/Tungsten-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-tungsten",
});

const helvetica = localFont({
  src: [
    {
      path: "../../public/assets/fonts/Helvetica-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/assets/fonts/Helvetica.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Lens & Style Collective - Creative Styling and Photography",
  description:
    "Discover the Lens & Style Collective, where creativity meets photography. Our collective specializes in unique styling and professional photography services for personal and commercial projects. Explore our portfolio and learn more about our team and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tungsten.variable} ${helvetica.variable}`}>
        <CursorManager>
          <CustomCursor />
          <Header />

          {children}
        </CursorManager>
      </body>
    </html>
  );
}
