import { z } from "zod";

// form => formData (string) => parse form => data => body

export const UserCommentFormSchema = z.object({
  content: z.string().min(1, {
    message: "댓글을 입력해주세요.",
  }),
  postId: z.string(),
  parentCommentId: z.string().optional(),
});

export const GuestCommentFormSchema = z.object({
  content: z.string().min(1, {
    message: "댓글을 입력해주세요.",
  }),
  email: z.string().email({ message: "정확한 이메일을 입력해주세요." }),
  password: z
    .string()
    .min(4, {
      message: "비밀번호는 최소 4자리 이상이어야 합니다.",
    })
    .max(14, {
      message: "비밀번호는 최대 14자리 이하이어야 합니다.",
    }),
  postId: z.string(),
  parentCommentId: z.string().optional(),
  nickName: z.string().default("익명"),
});

export const CategoryFormSchema = z.object({
  id: z
    .string({ required_error: "카테고리를 선택하세요." })
    .refine((value) => value !== "", { message: "카테고리를 선택하세요" })
    .optional(),
  name: z
    .string()
    .min(1, {
      message: "카테고리를 입력해주세요",
    })
    .optional(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "정확한 이메일을 입력해주세요.",
  }),
  password: z
    .string()
    .min(4, {
      message: "비밀번호는 최소 4자리 이상이어야 합니다.",
    })
    .max(14, {
      message: "비밀번호는 최대 14자리 이하이어야 합니다.",
    }),
});

export const PostFormSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요."),
  summary: z.string().min(1, "요약을 입력하세요."),
  category: z
    .string({ required_error: "카테고리를 선택하세요." })
    .refine((value) => value !== "", { message: "카테고리를 선택하세요" }),
  content: z.string().min(1, "내용을 입력하세요."),
  prevId: z.coerce.number().nonnegative("음수는 입력할 수 없습니다."),
  nextId: z.coerce.number().nonnegative("음수는 입력할 수 없습니다."),
  draft: z.string().transform((val) => val === "true"),
  images: z
    .string()
    .transform((val) => JSON.parse(val))
    .optional(),
});
