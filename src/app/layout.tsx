import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { fonts } from "./fonts";
import { cn } from "@/utils/cn";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Satsouk App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        fonts.sora.className,
        "bg-zinc-900 text-white flex flex-col items-center"
      )}>
        <Providers>
          <Navbar />
          <div className="absolute top-0 left-[50%] w-full h-screen max-w-[1238px] max-h-[708px] translate-x-[-50%] translate-y-[-50%] bg-primary-gradient opacity-25 rounded-[100%] blur-3xl"></div>
          <div className="w-full max-w-[1238px] mt-[74px] mx-auto inset-0">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
