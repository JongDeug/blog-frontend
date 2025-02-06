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
import { useActionState, useEffect } from "react";
import { userCommentAction } from "@/app/actions/comment.action";
import { Input } from "../ui/input";
import { UserCommentFormSchema } from "@/lib/schema";

export default function UserCommentForm({
  postId,
  parentCommentId,
}: {
  postId: string;
  parentCommentId?: string;
}) {
  const [state, formAction, isPending] = useActionState(
    userCommentAction,
    null
  );
  const form = useForm<z.infer<typeof UserCommentFormSchema>>({
    resolver: zodResolver(UserCommentFormSchema),
  });

  useEffect(() => {
    if (state && state.status) form.reset();

    if (state && !state.status) {
      console.log(state?.errors);
      toast({
        variant: "destructive",
        title: "댓글 작성 실패",
        description: `${state.error}`,
      });
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <Input type="hidden" name="postId" value={postId} />
        {parentCommentId && (
          <Input type="hidden" name="parentCommentId" value={parentCommentId} />
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>댓글 작성하기</FormLabel>
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
