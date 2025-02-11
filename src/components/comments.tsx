"use client";

import { ko } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { Comment } from "../types";
import { useState } from "react";
import UserCommentForm from "./form/user-comment.form";
import { toast } from "./hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "./hooks/use-session";
import GuestCommentForm from "./form/guest-comment.form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Comments({
  comments,
  guestId,
}: {
  comments: Comment[];
  guestId: string | undefined;
}) {
  const [reply, setReply] = useState<number | null>(null);
  const [edit, setEdit] = useState<number | null>(null);
  const { userInfo, isLogin } = useSession();

  return (
    <div className="space-y-6 pb-6">
      {/* 댓글 렌더링 */}
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>
              {comment.authorId
                ? comment.author?.name[0]
                : comment.guest?.nickName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {comment.authorId
                    ? comment.author?.name
                    : comment.guest?.nickName}
                </span>
                <span className="text-sm text-neutral-500">
                  {format(comment.createdAt, "PPP", { locale: ko })}
                </span>
              </div>

              {/* 댓글 수정 삭제 버튼 */}
              {(userInfo && userInfo.role === "ADMIN") ||
              (userInfo && userInfo.email === comment.author?.email) ||
              (guestId && guestId === comment.guest?.guestId) ? (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setEdit(edit === comment.id ? null : comment.id)
                    }
                  >
                    수정
                  </Button>

                  {isLogin ? (
                    <DeleteUserCommentBtn commentId={String(comment.id)} />
                  ) : (
                    <DeleteGuestComment commentId={String(comment.id)} />
                  )}
                </div>
              ) : null}
            </div>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm">
              {comment.content}
            </p>

            {/* 댓글 수정 폼 렌더링 */}
            {edit === comment.id &&
              (isLogin ? (
                <UserCommentForm
                  initialValues={{
                    content: comment.content,
                    postId: String(comment.postId),
                  }}
                  method="update"
                  commentId={String(comment.id)}
                  setEdit={setEdit}
                />
              ) : (
                <GuestCommentForm
                  initialValues={{
                    content: comment.content,
                    email: "",
                    password: "",
                    postId: String(comment.postId),
                  }}
                  method="update"
                  commentId={String(comment.id)}
                  setEdit={setEdit}
                />
              ))}

            {/* 대댓글 렌더링 */}
            <div className="space-y-8 pt-3">
              {comment.childComments.map((childComment) => (
                <div
                  key={childComment.id}
                  className="flex gap-4 pl-4 border-l border-neutral-200"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={""} />
                    <AvatarFallback>
                      {childComment.authorId
                        ? childComment.author?.name[0]
                        : childComment.guest?.nickName[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {childComment.authorId
                            ? childComment.author.name
                            : childComment.guest?.nickName}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {format(childComment.createdAt, "PPP", {
                            locale: ko,
                          })}
                        </span>
                      </div>

                      {/* 대댓글 수정 삭제 버튼 */}
                      {(userInfo && userInfo.role === "ADMIN") ||
                      (userInfo &&
                        userInfo.email === childComment.author?.email) ||
                      (guestId && guestId === childComment.guest?.guestId) ? (
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setEdit(
                                edit === childComment.id
                                  ? null
                                  : childComment.id
                              )
                            }
                          >
                            수정
                          </Button>

                          {isLogin ? (
                            <DeleteUserCommentBtn
                              commentId={String(childComment.id)}
                            />
                          ) : (
                            <DeleteGuestComment
                              commentId={String(childComment.id)}
                            />
                          )}
                        </div>
                      ) : null}
                    </div>

                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      {childComment.content}
                    </p>

                    {/* 대댓글 수정 폼 렌더링 */}
                    {edit === childComment.id &&
                      (isLogin ? (
                        <UserCommentForm
                          initialValues={{
                            content: childComment.content,
                            postId: String(childComment.postId),
                          }}
                          method="update"
                          commentId={String(childComment.id)}
                          setEdit={setEdit}
                        />
                      ) : (
                        <GuestCommentForm
                          initialValues={{
                            content: childComment.content,
                            email: "",
                            password: "",
                            postId: String(childComment.postId),
                          }}
                          method="update"
                          commentId={String(childComment.id)}
                          setEdit={setEdit}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-500"
              onClick={() => setReply(reply === comment.id ? null : comment.id)}
            >
              답글
            </Button>

            {/* 대댓글 답글 폼 렌더링 */}
            {reply === comment.id &&
              (isLogin ? (
                <UserCommentForm
                  initialValues={{
                    content: "",
                    postId: String(comment.postId),
                    parentCommentId: String(comment.id),
                  }}
                  method="create"
                />
              ) : (
                <GuestCommentForm
                  initialValues={{
                    content: "",
                    email: "",
                    password: "",
                    postId: String(comment.postId),
                    parentCommentId: String(comment.id),
                  }}
                  method="create"
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeleteUserCommentBtn({ commentId }: { commentId: string }) {
  const router = useRouter();

  const onClickDeleteUserComment = async (id: string) => {
    const isConfirmed = confirm("정말 삭제하시겠습니까?");
    if (isConfirmed) {
      const response = await fetch(`/api/next/comment/user/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "댓글 삭제 실패",
          description: `${error.message}`,
        });
      }

      router.refresh();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-500"
      onClick={() => onClickDeleteUserComment(commentId)}
    >
      삭제
    </Button>
  );
}

function DeleteGuestComment({ commentId }: { commentId: string }) {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClickDeleteGuestComment = async (id: string) => {
    if (password) {
      const response = await fetch(`/api/next/comment/guest/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const error = await response.json();
        toast({
          variant: "destructive",
          title: "댓글 삭제 실패",
          description: `${error.message}`,
        });
      }

      router.refresh();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-500">
          삭제
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <div className="grid grid-cols-4 items-center gap-2 ">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="col-span-3"
            placeholder="비밀번호"
          />{" "}
          <Button onClick={() => onClickDeleteGuestComment(commentId)}>
            확인
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
