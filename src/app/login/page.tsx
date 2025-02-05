"use client";

import Image from "next/image";
import logo from "@/assets/icon.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";

import { toast } from "../../components/hooks/use-toast";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/hooks/use-session";

const FormSchema = z.object({
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

export default function Page() {
  const router = useRouter();
  const { setIsLogin } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (response && !response.ok) {
      const error = await response.json();
      return toast({
        variant: "destructive",
        title: "로그인 실패",
        description: `${error.message}.`,
      });
    }

    setIsLogin(true);
    router.back();
  }

  return (
    <div className="flex flex-col gap-3 items-center my-20">
      <section className="flex gap-2 w-fit items-center cursor-pointer transition-all duration-200 hover:scale-110 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold tracking-tighter">Jongdeug</h1>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[250px] md:w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                    className="dark:border-neutral-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    className="dark:border-neutral-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full bg-green-500 font-bold hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
              로그인
            </Button>
            <Button
              type="button"
              className="w-full font-bold bg-white text-black hover:bg-gray-200 border border-gray-200"
            >
              <FcGoogle />
              구글로 로그인
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
