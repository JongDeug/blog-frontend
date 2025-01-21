"use client";

import { Editor } from "@toast-ui/react-editor";
import type { EditorProps } from "@toast-ui/react-editor";
import { useTheme } from "next-themes";

// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
// import Prism from "prismjs";
// import "prismjs/themes/prism.css";

// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Viewer } from '@toast-ui/react-editor';

// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

export default function EditorWrapper(props: EditorProps) {
  const { theme } = useTheme();
  return <Editor {...props} theme={theme} />;
}
