import { z } from "zod";

export const UserCommentFormSchema = z.object({
  content: z.string().min(1, {
    message: "댓글을 입력해주세요.",
  }),
  postId: z.string(),
  parentCommentId: z.string().optional(),
});
