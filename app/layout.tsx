import { ClerkProvider } from "@clerk/nextjs";
import { Recursive } from "next/font/google";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

import NavigationBar from "@/components/NavigationBar.component";
import Footer from "@/components/Footer.component";
import { Toaster } from "@/components/ui/sonner";

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
    <ClerkProvider>
      <html lang="en">
        <body className={cn(RecursiveFont.className, "p-8 w-full min-w-[425px] max-w-2xl min-h-screen mx-auto flex flex-col gap-12")}>
          <NavigationBar />
          <section className="flex-1 flex flex-col gap-12">
            {children}
            <Toaster />
          </section>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
