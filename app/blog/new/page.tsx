"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import ToastEditor from "@/components/editor";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EditorProps } from "@toast-ui/react-editor";

export function CardWithForm() {
  const editorProps: EditorProps = {
    initialValue: "hello next.js",
    previewStyle: "tab",
    height: "600px",
    initialEditType: "markdown",
    useCommandShortcut: true,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>게시글 작성하기</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">제목</Label>
              <Input id="title" placeholder="제목을 입력해주세요." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="summary">요약</Label>
              <Textarea
                id="summary"
                placeholder="게시글 설명을 작성해주세요."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tag">카테고리</Label>
              <ComboboxDemo />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tag">내용</Label>
              <ToastEditor {...editorProps} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="tag">이전</Label>
                  <Input
                    id="title"
                    placeholder="이전 게시글의 id를 입력해주세요."
                    className="w-full"
                  />
                </div>

                <div className="w-full">
                  <Label htmlFor="tag">다음</Label>
                  <Input
                    id="title"
                    placeholder="다음  게시글의 id를 입력해주세요."
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tag">태그</Label>
              input
            </div> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">임시저장</Button>
        <Button className="bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600">
          완료
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  return <CardWithForm />;
}

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue: any) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
