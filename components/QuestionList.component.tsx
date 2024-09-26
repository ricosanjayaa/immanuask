"use client";
import Link from "next/link";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { useState, useCallback } from "react";
import { fetchQuestions } from "@/lib/actions";
import { useMediaQuery } from "react-responsive";

import Card from "@/components/Card.component";
import { Button } from "@/components/ui/button";
import Filter from "@/components/Filter.component";
import { LoadingButton } from "@/components/LoadingButton.component";

type SortingType = "hot questions" | "top questions" | "recent questions";

/* eslint-disable */
export default function QuestionList({ initialQuestions }: { initialQuestions: any[] }) {
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState<SortingType>("hot questions");
  const [limit, setLimit] = useState(5);
  const [hasMoreQuestions, setHasMoreQuestions] = useState(true);

  // Media query for detecting the 'md' breakpoint and above
  const isMdOrLarger = useMediaQuery({ query: "(min-width: 768px)" });

  const handleRefresh = useCallback(
    async (sortingOption?: SortingType, newLimit?: number) => {
      const sortToUse = sortingOption || sorting;
      const limitToUse = newLimit || limit;
      try {
        setLoading(true);
        const refreshedQuestions = await fetchQuestions(process.env.NEXT_PUBLIC_PASSKEY as string, {
          sorting: sortToUse,
          limit: limitToUse,
        });
        setQuestions(refreshedQuestions);
        setHasMoreQuestions(true);
        toast("Woahh! It's a success 😄", {
          description: "The question list has been successfully refreshed.",
        });
      } catch (error) {
        console.error("Error refreshing questions:", error);
        toast("Oops.. it failed ☹️", {
          description: "Looks like something was off while refreshing the questions, please try again later.",
        });
      } finally {
        setLoading(false);
      }
    },
    [sorting, limit]
  );

  const handleMoreQuestions = async () => {
    const newLimit = limit + 5;
    setLimit(newLimit);
    try {
      setLoading(true);
      const moreQuestions = await fetchQuestions(process.env.NEXT_PUBLIC_PASSKEY as string, { sorting, limit: newLimit });

      setQuestions((prevQuestions) => {
        const newUniqueQuestions = moreQuestions.filter(
          (question) => !prevQuestions.some((prevQuestion) => prevQuestion.id === question.id)
        );
        return [...prevQuestions, ...newUniqueQuestions];
      });

      if (moreQuestions.length < newLimit) {
        setHasMoreQuestions(false);
        toast("All caught up! 🎉", { description: "You've seen all available questions." });
      } else {
        toast("More questions loaded! 📚", { description: "We've added more questions to the list." });
      }
    } catch (error) {
      console.error("Error loading more questions:", error);
      toast("Oops.. it failed ☹️", {
        description: "We couldn't load more questions, please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSortingChange = (newSorting: SortingType) => {
    setSorting(newSorting);
    setLimit(5);
    setHasMoreQuestions(true);
    handleRefresh(newSorting, 5);
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 justify-between items-baseline">
        <p>Sort by</p>
        <div className="flex flex-row w-full justify-between">
          <Filter value={sorting} onChange={handleSortingChange} />
          {isMdOrLarger && !loading ? (
            <Button onClick={() => handleRefresh()}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          ) : <Button onClick={() => handleRefresh()}><RefreshCcw className="h-4 w-4" /></Button>}
          {loading && <LoadingButton />}
        </div>
      </div>

      {Array.isArray(questions) && questions.length > 0 ? (
        <>
          {questions.map((question, index) => (
            <Card key={question.id} question={question} number={index + 1} />
          ))}
          <section className="flex flex-col gap-4 items-center">
            {!hasMoreQuestions ? (
              <p className="text-base tracking-tight text-muted-foreground">
                You actually hit the maximum! 👏
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">Want to see more?</p>
                <div className="flex flex-row gap-4">
                  <Button onClick={handleMoreQuestions} disabled={loading}>
                    {loading ? <LoadingButton /> : "More questions"}
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="/add">Add question</Link>
                  </Button>
                </div>
              </>
            )}
          </section>
        </>
      ) : (
        <p className="text-sm text-muted-foreground text-center">
          There is no question yet. Should we be the first? 😉
        </p>
      )}
    </section>
  );
}