"use client";
import { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { deleteComment } from "@/lib/actions";
import { toast } from "sonner";

interface CommentActionProps {
  id: string;
  onCommentDeleted: () => void;
}

export default function CommentAction({ id, onCommentDeleted }: CommentActionProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteComment(process.env.NEXT_PUBLIC_PASSKEY as string, id);
      toast("Woahh! It's a success 😄", { description: "Your comment was successfully deleted." });
      onCommentDeleted();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast("Oops.. it failed ☹️", { description: "Looks like something was off while deleting your comment." });
    } finally {
      setLoading(false);
    }
  };

  return loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash onClick={handleDelete} className="w-4 h-4 text-destructive cursor-pointer opacity-50 hover:opacity-100" />;
}
