"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function SubScriptions({
  subScriptionList,
}: {
  subScriptionList: { url: string; name: string }[];
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 fade">
      {subScriptionList.map(({ name, url }) => (
        <Badge
          key={name}
          variant="secondary"
          className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black cursor-pointer"
          onClick={() => {
            const queryString = new URLSearchParams();
            queryString.append("url", url);
            queryString.append("name", name);
            router.push(`/subscribe?${queryString.toString()}`, {
              scroll: false,
            });
          }}
        >
          {name}
        </Badge>
      ))}
    </div>
  );
}
