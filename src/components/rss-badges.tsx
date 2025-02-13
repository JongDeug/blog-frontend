"use client";

import { Badge } from "@/components/ui/badge";
import { rssList } from "@/lib/rss-list";
import { useRouter } from "next/navigation";

export default function RSSBadges() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 fade">
      {rssList.map(({ name, url }) => (
        <Badge
          key={name}
          variant="secondary"
          className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black cursor-pointer"
          onClick={() =>
            router.push(`/subscribe?url=${url}`, { scroll: false })
          }
        >
          {name}
        </Badge>
      ))}
    </div>
  );
}
