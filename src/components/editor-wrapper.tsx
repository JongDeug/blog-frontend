"use client";

import { env } from "@/const/env";
import { Editor } from "@toast-ui/react-editor";
import { useTheme } from "next-themes";
import { toast } from "./hooks/use-toast";

// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
// import Prism from "prismjs";
// import "prismjs/themes/prism.css";

// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Viewer } from '@toast-ui/react-editor';

// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

interface EditorWrapperProps {
  editorRef: React.RefObject<Editor>;
  initialValue: string;
}

export default function EditorWrapper({
  editorRef,
  initialValue,
}: EditorWrapperProps) {
  const { theme } = useTheme();

  return (
    <Editor
      ref={editorRef}
      initialValue={initialValue}
      previewStyle="tab"
      height="600px"
      initialEditType="markdown"
      hideModeSwitch={true}
      useCommandShortcut
      theme={theme}
      hooks={{
        addImageBlobHook: async (blob: File, callback: typeof Function) => {
          const formData = new FormData();
          formData.append("image", blob);

          // 이미지 업로드 => next => nest
          const response = await fetch("/api/image", {
            method: "POST",
            body: formData,
          });
          const fileInfoOrError = await response.json();

          if (!response.ok) {
            console.error(fileInfoOrError);
            return toast({
              variant: "destructive",
              title: "이미지 업로드 실패",
              description: `${fileInfoOrError.message}`,
            });
          }

          const imageUrl = `${env.API_URL}/uploads/${fileInfoOrError.filename}`;
          callback(imageUrl);
        },
      }}
    />
  );
}
