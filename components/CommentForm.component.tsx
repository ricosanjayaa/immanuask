"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const commentSchema = z.object({
  comment: z.string().min(2, { message: "Comment must be at least 2 characters or more." })
});

export default function CommentForm() {
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof commentSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField control={form.control} name="comment" render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea placeholder="Share your thoughts?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <Button type="submit">Add comment</Button>
      </form>
    </Form>
  )
}
