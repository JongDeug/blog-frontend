"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "../hooks/use-toast";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { userCommentAction } from "@/app/actions/comment.action";
import { Input } from "../ui/input";
import { UserCommentFormSchema } from "@/lib/schema";

interface InitialValues {
  content: string;
  postId: string;
  parentCommentId?: string;
}

export default function UserCommentForm({
  initialValues,
  method,
  commentId,
  setEdit,
}: {
  initialValues: InitialValues;
  method: "create" | "update";
  commentId?: string;
  setEdit?: Dispatch<SetStateAction<number | null>>;
}) {
  const [state, formAction, isPending] = useActionState(
    userCommentAction,
    null
  );
  const form = useForm<z.infer<typeof UserCommentFormSchema>>({
    resolver: zodResolver(UserCommentFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (state && state.status) {
      if (method === "update") setEdit!(null);
      else form.reset();
    }

    if (state && !state.status) {
      toast({
        variant: "destructive",
        title: `${method === "create" ? "댓글 작성" : "댓글 수정"} 실패`,
        description: `${state.error}`,
      });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <Input type="hidden" name="postId" value={initialValues.postId} />
        {commentId && (
          <Input type="hidden" name="commentId" value={commentId} />
        )}
        {initialValues.parentCommentId && (
          <Input
            type="hidden"
            name="parentCommentId"
            value={initialValues.parentCommentId}
          />
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {method === "create" ? "댓글 작성하기" : "댓글 수정하기"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="여기에 댓글을 작성해주세요."
                  className="resize-none dark:border-neutral-600"
                  {...field}
                />
              </FormControl>
              <FormMessage>{state?.errors?.content}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          확인
        </Button>
      </form>
    </Form>
  );
}
