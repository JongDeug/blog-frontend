import { z } from "zod";

export const FormSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요."),
  summary: z.string().min(1, "요약을 입력하세요."),
  category: z
    .string({ required_error: "카테고리를 선택하세요." })
    .refine((value) => value !== "", { message: "카테고리를 선택하세요" }),
  content: z.string().min(1, "내용을 입력하세요."),
  prevId: z.coerce.number().nonnegative("음수는 입력할 수 없습니다."),
  nextId: z.coerce.number().nonnegative("음수는 입력할 수 없습니다."),
  draft: z.boolean().default(false).optional(),
});
