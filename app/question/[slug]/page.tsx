import Card from "@/components/Card.component";
import Comment from "@/components/Comment.component";
import BackButton from "@/components/Back.component";
import CommentForm from "@/components/CommentForm.component";

export default function Page() {
  return (
    <>
      <BackButton />
      <Card numbered={false} className="-mt-8" />
      <CommentForm />
      <Comment />
      <Comment />
      <Comment />
    </>
  );
}