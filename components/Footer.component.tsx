import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-sm text-center"><span className="text-muted-foreground">@ {new Date().getFullYear()} Immanuask,  website is highly inspirated by </span><Link href="https://50hacks.co"><span className="font-medium underline underline-offset-2 text-muted-foreground hover:text-foreground">50hacks</span></Link><span className="text-muted-foreground">.</span></footer>
  );
}