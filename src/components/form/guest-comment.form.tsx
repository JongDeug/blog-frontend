"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { Input } from "../ui/input";
import { GuestCommentFormSchema } from "@/lib/schema";
import { z } from "zod";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { guestCommentAction } from "@/app/actions/comment.action";

interface InitialValues {
  email: string;
  password: string;
  content: string;
  postId: string;
  parentCommentId?: string;
}

export default function GuestCommentForm({
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
    guestCommentAction,
    null
  );

  const form = useForm<z.infer<typeof GuestCommentFormSchema>>({
    resolver: zodResolver(GuestCommentFormSchema),
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
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    disabled={method === "update"}
                    type="email"
                    placeholder="알림에 사용됩니다."
                    {...field}
                    className="dark:border-neutral-600"
                  />
                </FormControl>
                <FormMessage>{state?.errors?.email}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    {...field}
                    className="dark:border-neutral-600"
                  />
                </FormControl>
                <FormMessage>{state?.errors?.password}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          확인
        </Button>
      </form>
    </Form>
  );
}
