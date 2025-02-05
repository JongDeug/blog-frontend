"use client";

import { Category } from "@/types";
import { Badge } from "./ui/badge";
import { useSession } from "./hooks/use-session";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function CategoriesInner({
  categories,
}: {
  categories: Category[] | undefined;
}) {
  const { isLogin } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2 fade">
      {categories?.map((category) => (
        <Badge
          key={category.name}
          variant="secondary"
          className="hover:bg-green-100 dark:hover:bg-green-100 dark:hover:text-black cursor-pointer"
          onClick={() => router.push(`/blog?category=${category.name}`)}
        >
          {`${category.name} (${category._count.posts})`}
        </Badge>
      ))}
      {isLogin ? (
        <Dialog>
          <DialogTrigger className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors  dark:border-neutral-800 dark:focus:ring-neutral-300 border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80 hover:bg-green-300">
            +
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        // <Badge variant="secondary" className="hover:bg-green-300">
        //   +
        // </Badge>
        <></>
      )}
    </div>
  );
}
