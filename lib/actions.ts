"use server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

const validatePasskey = (passkey: string) => {
  if (passkey !== process.env.NEXT_PUBLIC_PASSKEY) {
    throw new Error("Passkey is not compatible with configuration.");
  }
};

export async function fetchUserId(passkey: string) {
  validatePasskey(passkey);
  const { userId } = auth();
  return userId;
}

export async function fetchUsername(passkey: string, userId: string) {
  validatePasskey(passkey);
  const { firstName, lastName } = await clerkClient.users.getUser(userId);
  return lastName ? `${firstName} ${lastName}` : firstName || '';
}

export async function fetchCommentUserData(passkey: string, userId: string) {
  validatePasskey(passkey);
  const { firstName, lastName, imageUrl, username } = await clerkClient.users.getUser(userId);
  const fullName = lastName ? `${firstName} ${lastName}` : firstName || lastName || 'Anonymous';

  return { fullName, imageUrl, username };
}

export async function fetchQuestions(passkey: string, { sorting = "hot questions", limit = 5 } = {}) {
  validatePasskey(passkey);

  /* eslint-disable */
  const orderBy: Record<string, any> = {
    "hot questions": { like: { _count: "desc" } },
    "top questions": { comments: { _count: "desc" } },
    "recent questions": { createdAt: "desc" },
  }[sorting] || { like: { _count: "desc" } };

  const questions = await prisma.question.findMany({
    include: { comments: true, like: true },
    orderBy,
    take: limit,
  });

  const questionsWithUsernames = await Promise.all(
    questions.map(async (question) => {
      const username = await fetchUsername(passkey, question.userId);
      return { ...question, username };
    })
  );

  return questionsWithUsernames;
}

export async function fetchQuestionsWithSlug(passkey: string, id: string) {
  validatePasskey(passkey);
  const question = await prisma.question.findFirst({
    where: { id },
    include: { comments: true, like: true },
  });

  if (!question) return null;

  const username = await fetchUsername(passkey, question.userId);
  return { ...question, username };
}

export async function fetchComments(passkey: string, questionId: string) {
  validatePasskey(passkey);
  return await prisma.comment.findMany({ where: { questionId } });
}

export async function deleteComment(passkey: string, commentId: string) {
  validatePasskey(passkey);
  return await prisma.comment.delete({ where: { id: commentId } });
}

export async function checkIfUserVoted(passkey: string, questionId: string) {
  validatePasskey(passkey);
  const { userId } = auth();
  const existingVote = await prisma.like.findFirst({
    where: { userId: userId as string, questionId },
  });

  return !!existingVote;
}

export async function voteQuestion(passkey: string, questionId: string) {
  validatePasskey(passkey);
  const { userId } = auth();
  
  const existingVote = await prisma.like.findFirst({
    where: { userId: userId as string, questionId },
  });

  try {
    if (existingVote) {
      await prisma.like.delete({ where: { id: existingVote.id } });
    } else {
      await prisma.like.create({ data: { questionId, userId: userId as string } });
    }
    return true;
  } catch (err: unknown) {
    console.error("Error voting question:", err);
    return false;
  }
}

export async function addQuestion(passkey: string, question: string) {
  validatePasskey(passkey);
  const { userId } = auth();
  
  if (!userId) throw new Error("User not authenticated");

  return await prisma.question.create({
    data: { question, userId },
  });
}

export async function deleteQuestion(passkey: string, questionId: string) {
  validatePasskey(passkey);
  const { userId } = auth();

  if (!userId) throw new Error("User not authenticated!");
  const question = await prisma.question.findFirst({ where: { id: questionId } });
  if (!question) throw new Error("Question doesn't exist!");
  if (userId !== question.userId) throw new Error("Not owner.");

  try {
    await prisma.question.delete({ where: { id: questionId } });
    return true;
  } catch {
    throw new Error("Error while deleting.");
  }
}

export async function addComment(passkey: string, questionId: string, comment: string) {
  validatePasskey(passkey);
  const { userId } = auth();
  
  if (!userId) throw new Error("User not authenticated");

  return await prisma.comment.create({
    data: { comment, userId, questionId },
  });
}
