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

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "정확한 이메일을 입력해주세요.",
  }),
  password: z.string().min(2, {
    message: "비밀번호는 최소 4자리 이상이어야 합니다.",
  }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <div className="flex flex-col gap-3 items-center">
      <section className="flex gap-2 w-fit items-center cursor-pointer transition-all duration-200 hover:scale-110 hover:text-green-500">
        <Image src={logo} alt="" className="w-10 rounded-md" />
        <h1 className="text-3xl font-bold tracking-tighter">Jongdeug</h1>
      </section>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@gmail.com"
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
                    {...field}
                    className="dark:border-neutral-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </form>
      </Form>
    </div>
  );
}
