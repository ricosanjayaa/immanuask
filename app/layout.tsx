import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/NavigationBar.component";
import Footer from "@/components/Footer.component";
import { cn } from "@/lib/utils";

const RecursiveFont = Recursive({
  weight: ["300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Immanuask",
  description: "Your place to question something about Immanuel Vocational High Pontianak!",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(RecursiveFont.className, "p-8 w-full min-w-[425px] max-w-2xl min-h-screen mx-auto flex flex-col gap-12")}>
        <NavigationBar />
        <section className="flex-1 flex flex-col gap-12">{children}</section>
        <Footer />
      </body>
    </html>
  );
}
