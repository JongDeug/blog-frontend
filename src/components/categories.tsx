"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Badge } from "./ui/badge";
import { useSession } from "./hooks/use-session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CategoryFormSchema } from "@/lib/schema";
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryAction,
} from "@/app/actions/category.action";
import { toast } from "./hooks/use-toast";

export default function Categories({ categories }: { categories: Category[] }) {
  const { isLogin } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 fade">
      {categories.map((category) => (
        <Badge
          key={category.name}
          variant="secondary"
          className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black cursor-pointer"
          onClick={() =>
            router.push(`/blog?category=${category.name}`, { scroll: false })
          }
        >
          {`${category.name} (${category._count.posts})`}
        </Badge>
      ))}
      {isLogin ? (
        <Dialog modal={false} open={open} onOpenChange={setOpen}>
          <DialogTrigger className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-neutral-800 dark:focus:ring-neutral-300 border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80 hover:bg-green-300">
            +
          </DialogTrigger>
          <DialogContent className="min-w-[200px]">
            <DialogHeader>
              <DialogTitle>카테고리 관리</DialogTitle>
              <DialogDescription>
                카테고리를 수정, 삭제, 추가해보세요!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <CreateCategory setOpen={setOpen} />
              <Separator />
              <UpdateCategory setOpen={setOpen} categories={categories} />
              <Separator />
              <DeleteCategory setOpen={setOpen} categories={categories} />
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}

function CreateCategory({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    createCategoryAction,
    null
  );

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (state && state.status) {
      setOpen(false);
      router.refresh();
    }

    if (state && !state.status) {
      console.log(state?.errors);
      toast({
        variant: "destructive",
        title: "카테고리 생성 실패",
        description: `${state.error}`,
      });
    }
  }, [state]);

  return (
    <section>
      <h3 className="font-semibold tracking-tight mb-2">CREATE</h3>
      <Form {...form}>
        <form className="flex flex-col md:flex-row gap-2" action={formAction}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="새 카테고리" {...field} />
                </FormControl>
                <FormMessage>{state?.errors?.name}</FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            추가
          </Button>
        </form>
      </Form>
    </section>
  );
}

function UpdateCategory({
  categories,
  setOpen,
}: {
  categories: Category[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    updateCategoryAction,
    null
  );

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (state && state.status) {
      setOpen(false);
      router.refresh();
    }

    if (state && !state.status) {
      console.log(state?.errors);
      toast({
        variant: "destructive",
        title: "카테고리 수정 실패",
        description: `${state.error}`,
      });
    }
  }, [state]);

  return (
    <section>
      <h3 className="font-semibold tracking-tight mb-2">UPDATE</h3>
      <Form {...form}>
        <form className="flex flex-col md:flex-row gap-2" action={formAction}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full"
                      >
                        {field.value
                          ? categories.find(
                              (category) => String(category.id) === field.value
                            )?.name
                          : "카테고리 선택"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="검색" className="h-9" />
                      <CommandList>
                        <CommandEmpty>찾을 수 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={String(category.id)}
                              key={String(category.id)}
                              onSelect={() => {
                                form.setValue("id", String(category.id));
                              }}
                            >
                              {category.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(category.id) === field.value
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
                <Input type="hidden" {...form.register("id")} />
                <FormMessage>{state?.errors?.id}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="새 카테고리" {...field} />
                </FormControl>
                <FormMessage>{state?.errors?.name}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            수정
          </Button>
        </form>
      </Form>
    </section>
  );
}

function DeleteCategory({
  categories,
  setOpen,
}: {
  categories: Category[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    deleteCategoryAction,
    null
  );

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (state && state.status) {
      setOpen(false);
      router.refresh();
    }

    if (state && !state.status) {
      console.log(state?.errors);
      toast({
        variant: "destructive",
        title: "카테고리 삭제 실패",
        description: `${state.error}`,
      });
    }
  }, [state]);

  return (
    <section>
      <h3 className="font-semibold tracking-tight mb-2">DELETE</h3>
      <Form {...form}>
        <form className="flex flex-col md:flex-row gap-2" action={formAction}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full"
                      >
                        {field.value
                          ? categories.find(
                              (category) => String(category.id) === field.value
                            )?.name
                          : "카테고리 선택"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="검색" className="h-9" />
                      <CommandList>
                        <CommandEmpty>찾을 수 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={String(category.id)}
                              key={String(category.id)}
                              onSelect={() => {
                                form.setValue("id", String(category.id));
                              }}
                            >
                              {category.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(category.id) === field.value
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
                <FormMessage>{state?.errors?.id}</FormMessage>
                <Input type="hidden" {...form.register("id")} />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} variant="destructive">
            삭제
          </Button>
        </form>
      </Form>
    </section>
  );
}
