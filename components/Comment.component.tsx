import moment from "moment";
import { useEffect, useState } from "react";
import { fetchCommentUserData, fetchUserId } from "@/lib/actions";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentAction from "@/components/CommentAction";

interface CommentProps {
  comment: {
    id: string;
    userId: string;
    comment: string;
    createdAt: string;
  };
  onCommentDeleted: () => void;
}

export default function Comment({ comment, onCommentDeleted }: CommentProps) {
  const [userData, setUserData] = useState<{ fullName: string; imageUrl: string; username: string | null } | null>(null);
  const [currentUserData, setCurrentUserData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchCommentUserData(process.env.NEXT_PUBLIC_PASSKEY as string, comment.userId);
        setUserData(data);

        const currentUserData = await fetchUserId(process.env.NEXT_PUBLIC_PASSKEY as string);
        setCurrentUserData(currentUserData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [comment.userId]);

  if (loading) return null;

  return (
    <div className="flex flex-row gap-4">
      <Avatar>
        <AvatarImage src={userData?.imageUrl} alt={`${userData?.username ? userData.username : userData?.fullName}'s avatar`} />
        <AvatarFallback>{userData?.fullName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row justify-between">
          <p className="text-sm">{userData?.fullName} <span className="text-muted-foreground">{moment(comment.createdAt).fromNow()}</span></p>
          {currentUserData === comment.userId && <CommentAction id={comment.id} onCommentDeleted={onCommentDeleted} />}
        </div>
        <p className="text-sm tracking-tight">{comment.comment}</p>
      </div>
    </div>
  );
}