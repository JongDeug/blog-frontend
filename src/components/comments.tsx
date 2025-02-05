import { ko } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Comment } from "../types";

export default function Comments() {
  const comments: Comment[] = [
    {
      id: "1",
      author: {
        name: "익명",
        image: "",
      },
      content: "Great post! Thanks for sharing.",
      createdAt: new Date(),
    },
    {
      id: "2",
      author: {
        name: "익명",
        image: "https://github.com/shadcn.png",
      },
      content: "Great post! Thanks for sharing.",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <Avatar>
            <AvatarImage src={comment.author.image} />
            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.author.name}</span>
                <span className="text-sm text-neutral-500">
                  {format(comment.createdAt, "PPP", { locale: ko })}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  수정
                </Button>
                <Button variant="ghost" size="sm" className="text-red-500">
                  삭제
                </Button>
              </div>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300">
              {comment.content}
            </p>

            <Button variant="ghost" size="sm" className="text-neutral-500">
              답글
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
