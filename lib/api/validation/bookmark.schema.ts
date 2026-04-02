import { z } from "zod";

export const bookmarkSchema = z.object({
  id: z.string(),
  user_id: z.uuid(),
  title: z.string().min(1),
  url: z.string(),
  favicon: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  pinned: z.boolean(),
  is_archived: z.boolean(),
  visit_count: z.number(),
  created_at: z.string(),
  last_visited_at: z.string().nullable(),
});

export const createBookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.url("Invalid URL"),
  description: z.string().min(1).max(280, "Max 280 characters"),
  tags: z.array(z.string().min(1)).min(1, "At least one tag required"),
});

export type Bookmark = z.infer<typeof bookmarkSchema>;
export type CreateBookmarkInput = z.infer<typeof createBookmarkSchema>;
