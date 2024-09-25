import BackButton from "@/components/Back.component";
import AddForm from "@/components/AddForm.component";

export default function Page() {
  return (
    <>
      <BackButton />
      <h1 className="-mt-8 text-3xl font-medium tracking-tighter text-center">What would you like to question?</h1>
      <AddForm />
    </>
  )
}
