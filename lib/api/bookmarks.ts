import supabase from "../supaBase";
import { CreateBookmarkInput } from "@/lib/api/validation/bookmark.schema";

// ========= Get all bookmarks ===========
export async function getBookmarks() {
  const { data, error } = await supabase.from("bookmarks").select("*");

  if (error) throw error;

  return data;
}

// ======= Get tags ========

export async function getTags(): Promise<string[]> {
  const { data, error } = await supabase.from("bookmarks").select("tags");

  if (error) throw error;

  const tags = data?.flatMap((item) => item.tags || []).filter(Boolean);

  return [...new Set(tags)];
}

// ======== create bookmark =========

export async function createBookmark(input: CreateBookmarkInput) {
  const userId = "170d0482-15a9-4216-a31a-1e67365961b6";
  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        ...input,
        user_id: userId,
        pinned: false,
        isArchived: false,
        visitCount: 0,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
