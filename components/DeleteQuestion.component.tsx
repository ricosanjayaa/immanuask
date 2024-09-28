import { useState, useEffect } from "react";
import { deleteQuestion, fetchUserId, fetchQuestionsWithSlug } from "@/lib/actions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DeleteQuestion({ questionId }: { questionId: string }) {
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        const userId = await fetchUserId(process.env.NEXT_PUBLIC_PASSKEY as string);
        const question = await fetchQuestionsWithSlug(process.env.NEXT_PUBLIC_PASSKEY as string, questionId);
        if (userId === question?.userId) {
          setIsOwner(true);
        }
      } catch (error) {
        console.error("Error checking ownership:", error);
      }
    };

    checkOwnership();
  }, [questionId]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const success = await deleteQuestion(process.env.NEXT_PUBLIC_PASSKEY as string, questionId);
      if (success) {
        window.location.href = "/";
        toast("Woahh! It's a success 😄", { description: "Your question was successfully deleted, you can no longer view it anymore." });
      } else {
        toast("Oops.. it failed ☹️", { description: "Looks like something was off while deleting your question." });
      }
    } catch {
      toast("Oops.. it failed ☹️", { description: "Looks like something was off while deleting your question." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOwner) return null;

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={loading}>
      {loading ? "Deleting..." : "Delete this question"}
    </Button>
  );
}