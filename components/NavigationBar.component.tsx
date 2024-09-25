import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavigationBar() {
  return (
    <nav className="flex flex-row items-center justify-between rounded-lg">
      <Link href="/"><span className="text-2xl font-medium text-muted-foreground tracking-tighter hover:text-foreground">Immanuask</span></Link>
      <Button asChild><Link href="/add">Add question</Link></Button>
    </nav>
  );
}