"use client";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import Prism from "prismjs";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";

// https://github.com/PrismJS/prism/tree/master/components
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-clike.js";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function useEditorRef() {
  const viewerRef = useRef<any>();

  useEffect(() => {
    const el = viewerRef.current.getRootElement();
    const contents = el.querySelector(".toastui-editor-contents");

    // 스타일 조정
    if (contents) {
      contents.style.fontSize = "16px";
      contents.style.lineHeight = "1.8"; // 줄 간격 조정
      contents.style.letterSpacing = "0.3px"; // 글자 간격 조정
      // contents.style.wordSpacing = "1px"; // 단어 간격 조정

      const elements = {
        p: "16px",
        h1: "26px",
        h2: "23px",
        h3: "19px",
        h4: "17px",
        code: "14px",
      };

      // const elements = {
      //   p: { fontSize: "16px", lineHeight: "1.8" },
      //   h1: { fontSize: "24px", lineHeight: "2.0" },
      //   h2: { fontSize: "20px", lineHeight: "1.9" },
      //   h3: { fontSize: "18px", lineHeight: "1.8" },
      //   code: { fontSize: "14px", lineHeight: "1.6", letterSpacing: "1px" },
      // };

      Object.entries(elements).forEach(([tag, size]) => {
        contents.querySelectorAll(tag).forEach((element: HTMLElement) => {
          element.style.fontSize = size;
        });
      });
    }
  }, []);

  return { viewerRef };
}

export default function ViewerWrapper({
  initialValue,
}: {
  initialValue: string;
}) {
  const { viewerRef } = useEditorRef();
  const { theme } = useTheme();

  return (
    <Viewer
      initialValue={initialValue}
      theme={theme as "light" | "dark"}
      ref={viewerRef}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
    />
  );
}
