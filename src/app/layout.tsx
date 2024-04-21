import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
