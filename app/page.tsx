import Link from "next/link";
import { fetchQuestions } from "@/lib/actions";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import QuestionList from "@/components/QuestionList.component";

export default async function Page() {
  const questions = await fetchQuestions(process.env.NEXT_PUBLIC_PASSKEY as string);

  return (
    <>
      <section className="py-4 md:py-8 flex flex-col gap-4 text-center">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tighter">Your place to question something about Immanuel Vocational High Pontianak.</h1>
        <p className="text-lg">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="font-medium underline underline-offset-2">Upvote & comment</TooltipTrigger>
              <TooltipContent>Tap on a question to get started!</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-muted-foreground"> on your favorites. </span>
          <Link href="/add" className="font-medium underline underline-offset-2">Add</Link>
          <span className="text-muted-foreground"> your own question with no account required!</span>
        </p>
      </section>
      <QuestionList initialQuestions={questions} />
    </>
  );
}