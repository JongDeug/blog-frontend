import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import ToastEditor from "@/components/editor";

import type { EditorProps } from "@toast-ui/react-editor";
import { Combobox } from "@/components/combobox";

export function PostForm({ title }: { title: string }) {
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
        <CardTitle>{title}</CardTitle>
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
              <Combobox />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tag">내용</Label>
              <ToastEditor {...editorProps} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="tag">이전 게시글</Label>
                  <Input
                    id="title"
                    placeholder="이전 게시글의 id를 입력해주세요."
                    className="w-full"
                  />
                </div>

                <div className="w-full">
                  <Label htmlFor="tag">다음 게시글</Label>
                  <Input
                    id="title"
                    placeholder="다음  게시글의 id를 입력해주세요."
                    className="w-full"
                  />
                </div>
              </div>
            </div>
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
