"use client";

import Image from "next/image";
import logo from "@/assets/icon.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/hooks/use-session";
import { loginAction } from "../actions/login.action";
import { useActionState, useEffect } from "react";
import { LoginFormSchema } from "@/lib/schema";
import { env } from "@/const/env";

export default function Page() {
  const router = useRouter();
  const { setLoginInfo } = useSession();
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (state && state?.status) {
      // isLogin=true 주면 provider에서 알아서 설정
      setLoginInfo({ isLogin: true, role: "", email: "" });
      router.back();
    }

    if (state && !state?.status) {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: `${state?.error}.`,
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-3 items-center my-20">
      <section className="flex gap-2 w-fit items-center cursor-pointer transition-all duration-200 hover:scale-110 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold tracking-tighter">Jongdeug</h1>
      </section>
      <Form {...form}>
        <form action={formAction} className="min-w-[250px] md:w-2/3 space-y-6">
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
                <FormMessage>{state?.errors?.email}</FormMessage>
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
                <FormMessage>{state?.errors?.password}</FormMessage>
              </FormItem>
            )}
          />
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-green-500 font-bold hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
              로그인
            </Button>
            <Button
              type="button"
              className="w-full font-bold bg-white text-black hover:bg-gray-200 border border-gray-200"
              onClick={() => {
                window.location.href = `${env.API_URL}/auth/to-google`;
                // router.push(`${env.API_URL}/auth/to-google`);
              }}
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
