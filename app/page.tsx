import Link from "next/link";
import { RefreshCcw } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Card from "@/components/Card.component";
import Filter from "@/components/Filter.component";

export default function Page() {
  return (
    <>
      <section className="py-4 md:py-8 flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-medium tracking-tighter">Your place to question something about Immanuel Vocational High Pontianak.</h1>
        <p className="text-lg"><TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="font-medium underline underline-offset-2">Upvote & comment</TooltipTrigger>
            <TooltipContent>Tap on a question to get started!</TooltipContent>
          </Tooltip>
        </TooltipProvider><span className="text-muted-foreground"> on your favorites. </span><Link href="/add" className="font-medium underline underline-offset-2">Add</Link><span className="text-muted-foreground"> your own question with no account required!</span></p>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 justify-between items-baseline">
          <p>Sort by</p>
          <div className="flex flex-row w-full justify-between">
            <Filter />
            <Button><RefreshCcw className="mr-2 h-4 2-4" /> Refresh</Button>
          </div>
        </div>
        <Card />
        <Card />
        <Card />
      </section>
    </>
  );
}