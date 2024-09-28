"use client";
import { useEffect, useState } from "react";
import { fetchQuestionsWithSlug } from "@/lib/actions";

import Card from "@/components/Card.component";
import BackButton from "@/components/Back.component";
import CommentForm from "@/components/CommentForm.component";
import CommentList from "@/components/CommentList.component";
import Loading from "@/components/Loading.component";
import NotFound from "@/components/NotFound.component";
import { DeleteQuestion } from "@/components/DeleteQuestion.component";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  /* eslint-disable */
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshComments, setRefreshComments] = useState(false);


  useEffect(() => {
    const searchQuestion = async () => {
      try {
        setLoading(true);
        const fetchedQuestion = await fetchQuestionsWithSlug(process.env.NEXT_PUBLIC_PASSKEY as string, slug);
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    searchQuestion();
  }, [slug]);

  const handleCommentAdded = () => {
    setRefreshComments((prev) => !prev);
  };

  if (loading) {
    return <Loading context="question" />;
  }

  if (!question) {
    return <NotFound />;
  }

  return (
    <>
      <BackButton />
      <div className="flex flex-col gap-4">
        <Card numbered={false} question={question} className="-mt-8" />
        <DeleteQuestion questionId={question.id as string} />
      </div>
      <CommentForm questionId={question.id} onCommentAdded={handleCommentAdded} />
      <CommentList questionId={question.id} refresh={refreshComments} />
    </>
  );
}