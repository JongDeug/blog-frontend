"use client";

import { useSession } from "../hooks/use-session";
import GuestCommentForm from "./guest-comment.form";
import UserCommentForm from "./user-comment.form";

export function CommentForm({ slug }: { slug: string }) {
  const { loginInfo } = useSession();

  return (
    <div>
      {loginInfo?.isLogin ? (
        <UserCommentForm
          initialValues={{ content: "", postId: slug }}
          method="create"
        />
      ) : (
        <GuestCommentForm
          initialValues={{
            content: "",
            email: "",
            password: "",
            postId: slug,
          }}
          method="create"
        />
      )}
    </div>
  );
}
