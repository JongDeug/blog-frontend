"use client";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useRef } from "react";
import React from "react";
import { useTheme } from "next-themes";

export function useEditorRef() {
  const viewerRef = useRef<any>();

  const toggleMode = () => {
    const el = viewerRef.current.getRootElement();
    if (el.classList.contains("toastui-editor-dark"))
      el.classList.remove("toastui-editor-dark");
    else el.classList.add("toastui-editor-dark");
  };

  return { viewerRef, toggleMode };
}

export default function ViewerWrapper({
  initialValue,
}: {
  initialValue: string;
}) {
  const { viewerRef, toggleMode } = useEditorRef();
  const { theme } = useTheme();

  return (
    <Viewer
      height="600px"
      initialValue={initialValue}
      theme={theme as "light" | "dark"}
      ref={viewerRef}
    />
  );
}
