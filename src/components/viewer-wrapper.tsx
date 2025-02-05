"use client";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useEffect, useRef } from "react";
import React from "react";
import { useTheme } from "next-themes";

export function useEditorRef() {
  const viewerRef = useRef<any>();

  useEffect(() => {
    const el = viewerRef.current.getRootElement();
    const contents = el.querySelector(".toastui-editor-contents");

    // 스타일 조정
    if (contents) {
      contents.style.fontSize = "16px";

      const elements = {
        p: "16px",
        h1: "24px",
        h2: "20px",
        h3: "18px",
        code: "14px",
      };

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
    />
  );
}
