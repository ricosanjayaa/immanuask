import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NavigationBar() {
  return (
    <nav className="flex flex-row items-center justify-between rounded-lg">
      <Link href="/"><span className="text-2xl font-medium text-muted-foreground tracking-tighter hover:text-foreground">Immanuask</span></Link>
      <section className="flex flex-row gap-4 items-center">
        <SignedIn>
          <Button asChild><Link href="/add">Add</Link></Button>
          <UserButton />
        </SignedIn>
      </section>
      <SignedOut><Button variant="secondary" asChild><Link href="/sign-in">Sign in</Link></Button></SignedOut>
    </nav>
  );
}