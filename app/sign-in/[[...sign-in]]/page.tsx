import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <section className="pt-12 flex justify-center"><SignIn /></section>;
}