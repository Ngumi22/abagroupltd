import type { Blog } from "@/lib/types";
import { blogs } from "@/lib/data";

export async function getBlogPosts(): Promise<Blog[]> {
  return blogs;
}
