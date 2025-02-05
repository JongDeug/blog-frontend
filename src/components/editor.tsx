"use client";

import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import type { Editor, EditorProps } from "@toast-ui/react-editor";
import { useCallback, useRef } from "react";

const EditorWrapper = dynamic<EditorProps>(
  () => import("./editor-wrapper").then((mod) => mod.default as any),
  { ssr: false }
);

interface ToastEditorProps {
  editorRef: React.RefObject<Editor>;
  initialValue: string;
}

export default function ToastEditor({
  editorRef,
  initialValue,
}: ToastEditorProps) {
  return <EditorWrapper editorRef={editorRef} initialValue={initialValue} />;
}
