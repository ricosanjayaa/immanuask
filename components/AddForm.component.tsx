"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const addSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters or more." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters or more." })
});

export default function AddForm() {
  const form = useForm<z.infer<typeof addSchema>>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      question: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof addSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormField control={form.control} name="question" render={({ field }) => (
          <FormItem>
            <FormLabel>Question <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Textarea placeholder="What would you like to question about Immanuel Vocal High?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField control={form.control} name="username" render={({ field }) => (
          <FormItem>
            <FormLabel>Username <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              Username is used for display only.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <div className="flex flex-col gap-2">
          <Button type="submit">Submit</Button>
          <p className="text-center text-[0.8rem] text-muted-foreground">Your question will appear in the list after 30 seconds.</p>
        </div>
      </form>
    </Form>
  )
}
