import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Card({ className, numbered = true }: { className?: string, numbered?: boolean }) {
  return (
    <Link href="/question/abc" className={cn("p-4 bg-slate-50 flex flex-col gap-4 justify-between rounded-lg", className)}>
      <h5 className="flex-1">{numbered && "1. "}Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis cumque modi velit alias ducimus.</h5>
      <div className="flex felx-row gap-2 justify-between items-baseline">
        <p className="text-sm"><span className="text-muted-foreground">By anonymoususeranjay 6 days ago | </span><span className="font-medium hover:underline underline-offset-2 text-muted-foreground hover:text-foreground">0 comment</span></p>
        <div className="flex flex-row items-center gap-2 p-2 hover:bg-foreground/5 rounded-md cursor-pointer">
          <p className="text-xl -m-2">👍</p>
          <p className="font-medium">0</p>
        </div>
      </div>
    </Link>
  );
}