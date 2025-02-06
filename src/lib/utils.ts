import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function extractImages(markdown: string) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const matches = [...markdown.matchAll(imageRegex)];
  return matches.map((match) => match[1].split("/").pop());
}
