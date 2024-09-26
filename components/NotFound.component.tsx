import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <h1 className="text-2xl font-medium tracking-tighter">Page not found ☹️</h1>
      <p className="-mt-4 text-muted-foreground tracking-tight">No worries, there are a lot of other questions waiting for you to surf!</p>
      <Button asChild><Link href="/">View top asked questions</Link></Button>
    </div>
  );
}