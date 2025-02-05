"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

import ToastEditor from "../editor";

import type { Editor, EditorProps } from "@toast-ui/react-editor";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormEvent, useEffect, useRef } from "react";
import { FormSchema } from "@/app/blog/new/schema";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "../hooks/use-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { postAction } from "@/app/actions/post.action";

interface InitialValues {
  title: string;
  summary: string;
  category: string;
  content: string;
  prevId: number;
  nextId: number;
  draft: boolean;
}

interface Category {
  value: string;
  label: string;
}

export function PostForm({
  title,
  initialValues,
  categories,
  method,
  postId,
}: {
  title: string;
  initialValues: InitialValues;
  categories: Category[];
  method: "create" | "update";
  postId?: string;
}) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const editorRef = useRef<Editor>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  const [state, formAction] = useFormState(postAction, null);

  useEffect(() => {
    if (state) {
      if (state.status) {
        if (method === "create") router.replace("/blog");
        if (method === "update") router.replace(`/blog/${postId}`);
      } else {
        console.log(state?.errors);
        toast({
          variant: "destructive",
          title: "게시글 작성 실패",
          description: `${state?.error}.`,
        });
      }
    }
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editorRef.current) return;

    const formData = new FormData(e.currentTarget);
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance.getMarkdown();
    formData.append("content", content);

    const draft = form.watch("draft");
    formData.append("draft", `${draft}`);

    if (method === "update" && postId) {
      formData.append("postId", `${postId}`);
    }

    formAction(formData);
  };

  return (
    <Form {...form}>
      <form action={formAction} onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="제목을 입력해주세요."
                        className="dark:border-neutral-600"
                      />
                    </FormControl>
                    <FormMessage>{state?.errors?.title}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>요약</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="게시글 설명을 작성해주세요."
                        className="dark:border-neutral-600"
                      />
                    </FormControl>
                    <FormMessage>{state?.errors?.summary}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>카테고리</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between dark:border-neutral-600",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories.find(
                                  (category) => category.value === field.value
                                )?.label
                              : "카테고리 선택"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>찾을 수 없습니다.</CommandEmpty>
                            <CommandGroup>
                              {categories.map((category) => (
                                <CommandItem
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    form.setValue("category", category.value);
                                  }}
                                >
                                  {category.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      category.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Input type="hidden" {...form.register("category")} />
                    <FormMessage>{state?.errors?.category}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">내용</Label>
                <ToastEditor
                  editorRef={editorRef}
                  initialValue={initialValues.content}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="prevId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>이전 ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="이전 게시글의 id를 입력해주세요."
                          className="dark:border-neutral-600"
                        />
                      </FormControl>
                      <FormMessage>{state?.errors?.prevId}</FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nextId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>다음 ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="다음 게시글의 id를 입력해주세요."
                          className="dark:border-neutral-600"
                        />
                      </FormControl>
                      <FormMessage>{state?.errors?.nextId}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <FormField
              control={form.control}
              name="draft"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-2.5 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>임시저장</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={pending}
              className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600"
            >
              완료
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
