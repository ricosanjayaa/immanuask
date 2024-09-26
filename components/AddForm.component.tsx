"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { addQuestion } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { Filter } from "bad-words";
import { useState } from "react";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const addSchema = z.object({
  question: z.string().min(5, { message: "Question must be at least 5 characters or more." })
});

export default function AddForm() {
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof addSchema>>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      question: ""
    },
  });

  async function onSubmit(values: z.infer<typeof addSchema>) {
    try {
      setDisabled(true);
      const filter = new Filter();
      filter.addWords("kontol", "anjing", "anj", "anying", "bajingan", "ewe", "ngewe", "ngentot", "asu", "bangsat", "kntl", "mmk", "lanjiau", "lanjiao", "lanciao", "knto", "babi", "brengsek", "jancok", "kampret", "pembunuh", "sialan", "setan", "tolol", "pecundang", "goblok", "bangke", "jembut", "bego", "bodoh", "bodo", "memek", "pepek","pantek", "bejat", "puki", "cibai", "dongo", "cipai", "kuciao", "tai", "kampret", "dongo", "syal", "sial", "peler", "plr", "penis", "vagina", "kampret", "tae", "monyet");     
      await addQuestion(process.env.NEXT_PUBLIC_PASSKEY as string, filter.clean(values.question.replace(/\n/g, " ").replace(/\s+/g, " ").trim().replace(/([.?!])\s*/g, "$1 ")));
      form.reset();
      toast("Woahh! It's a success 😄", { description: "Your question was successfully uploaded, you can view it yourself at the homepage." })
    } catch {
      toast("Oops.. it failed ☹️", { description: "Looks like something was off while uploading your question." })
    } finally {
      setDisabled(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormField control={form.control} name="question" render={({ field }) => (
          <FormItem>
            <FormLabel>Question <span className="text-destructive">*</span></FormLabel>
            <FormControl>
              <Textarea disabled={disabled} placeholder="What would you like to question about Immanuel Vocal High?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
        />
        <div className="flex flex-col gap-2">
          <Button disabled={disabled} type="submit">Submit</Button>
          <p className="text-center text-[0.8rem] text-muted-foreground">Your question will appear in the list after 30 seconds.</p>
        </div>
      </form>
    </Form>
  )
}