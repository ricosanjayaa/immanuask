"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addComment } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const commentSchema = z.object({
  comment: z.string().min(2, { message: "Comment must be at least 2 characters or more." }),
});

interface CommentFormProps {
  questionId: string;
  onCommentAdded: () => void;
}

export default function CommentForm({ questionId, onCommentAdded }: CommentFormProps) {
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {
    try {
      setDisabled(true);
      await addComment(process.env.NEXT_PUBLIC_PASSKEY as string, questionId, values.comment);
      form.reset();
      toast("Woahh! It's a success 😄", { description: "Your comment was successfully uploaded." });
      onCommentAdded();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast("Oops.. it failed ☹️", { description: "Looks like something was off while uploading your comment, please also make sure that you have signed in." });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="comment" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea disabled={disabled} placeholder="Share your thoughts?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button disabled={disabled} type="submit">Add comment</Button>
      </form>
    </Form>
  );
}
