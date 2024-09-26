import { useEffect, useState } from "react";
import { fetchComments } from "@/lib/actions";
import Comment from "@/components/Comment.component";
import Loading from "@/components/Loading.component";

interface CommentListProps {
  questionId: string;
  refresh: boolean;
}

export default function CommentList({ questionId, refresh }: CommentListProps) {
  /* eslint-disable */
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetComments = async () => {
    setLoading(true);
    try {
      const fetchedComments = await fetchComments(process.env.NEXT_PUBLIC_PASSKEY as string, questionId);
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetComments();
  }, [questionId, refresh]);

  return (
    <>
      {loading ? (
        <Loading context="comments" />
      ) : comments.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground text-center tracking-tight">
          Nothing here... what about you become the first to share your thoughts? 😊
        </p>
      )}
    </>
  );
}
