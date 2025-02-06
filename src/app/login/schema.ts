import { z } from "zod";

export const FormSchema = z.object({
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
