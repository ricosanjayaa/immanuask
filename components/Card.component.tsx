import moment from "moment";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { checkIfUserVoted, voteQuestion } from "@/lib/actions";
import { toast } from "sonner";

export default function Card({ className, numbered = true, question, number }: { className?: string,numbered?: boolean, question: any, number?: number }) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(question.like.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkVoteStatus = async () => {
      if (isSignedIn) {
        const userVoteStatus = await checkIfUserVoted(process.env.NEXT_PUBLIC_PASSKEY as string, question.id);
        setHasVoted(userVoteStatus);
      }
    };

    checkVoteStatus();
  }, [question.id, isSignedIn]);

  const handleVote = async (event: any) => {
    event?.preventDefault();
    event?.stopPropagation();
    if (loading) return;

    if (!isSignedIn) {
      toast("Oops.. it failed ☹️", { description: "You must have signed in to be upvoting a question." })
      router.push('/sign-in');
      return;
    }

    setLoading(true);
    const success = await voteQuestion(process.env.NEXT_PUBLIC_PASSKEY as string, question.id);
    if (success) {
      setHasVoted((prev) => !prev);
      setVoteCount((prevCount: number) => (hasVoted ? prevCount - 1 : prevCount + 1));
    }
    setLoading(false);
  };

  return (
    <div className={cn("p-4 bg-slate-50 flex flex-col gap-4 justify-between rounded-lg", className)}>
      <Link href={`/question/${question.id}`}>
        <h5 className="flex-1">{numbered && `${number}. `}{question.question}</h5>
      </Link>
      <div className="flex flex-row gap-2 justify-between items-baseline">
        <Link href={`/question/${question.id}`} className="text-sm">
          <span className="text-muted-foreground">
            By {question.username} | {moment(question.createdAt).fromNow()} |{" "}
          </span>
          <span className="font-medium hover:underline underline-offset-2 text-muted-foreground hover:text-foreground">
            {question.comments.length} {question.comments.length > 1 ? "comments" : "comment"}
          </span>
        </Link>
        <div
          className={`flex flex-row items-center gap-2 p-2 ${loading ? "cursor-not-allowed" : "cursor-pointer"} ${hasVoted ? "bg-foreground/5" : "hover:bg-foreground/5"} rounded-md`}
          onClick={handleVote}
        >
          <p className="text-xl -m-2">👍</p>
          <p className="font-medium">{voteCount}</p>
        </div>
      </div>
    </div>
  );
}