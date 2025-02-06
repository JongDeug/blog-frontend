"use client";

import { ko } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Comment } from "../types";
import { useState } from "react";
import UserCommentForm from "./form/user-comment.form";

export default function Comments({ comments }: { comments: Comment[] }) {
  const [reply, setReply] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex flex-row gap-4">
          <Avatar>
            <AvatarImage src={""} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-neutral-500">
                  {format(comment.createdAt, "PPP", { locale: ko })}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  수정
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  삭제
                </Button>
              </div>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm">
              {comment.content}
            </p>

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
                      {childComment.author.name[0]}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {childComment.author.name}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {format(childComment.createdAt, "PPP", {
                            locale: ko,
                          })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          수정
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500"
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      {childComment.content}
                    </p>
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

            {reply === comment.id && (
              <UserCommentForm
                postId={String(comment.postId)}
                parentCommentId={String(comment.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
