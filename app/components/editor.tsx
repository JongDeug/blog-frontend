"use client";

import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import type { EditorProps } from "@toast-ui/react-editor";

const EditorWrapper = dynamic<EditorProps>(
  () => import("./editor-wrapper").then((mod) => mod.default as any),
  { ssr: false }
);

export default function ToastEditor(props: EditorProps) {
  return <EditorWrapper {...props} />;
}
