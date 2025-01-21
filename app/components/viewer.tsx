"use client";

import dynamic from "next/dynamic";
import type { ViewerProps } from "@toast-ui/react-editor";

const ViewWrapper = dynamic<ViewerProps>(
  () => import("./viewer-wrapper").then((mod) => mod.default as any),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export default function ToastViewer({
  initialValue,
}: {
  initialValue: string;
}) {
  return <ViewWrapper initialValue={initialValue} />;
}
