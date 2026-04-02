import { useAuth } from "@/hooks/useAuth";
import supabase from "../supaBase";
import { CreateBookmarkInput } from "@/lib/api/validation/bookmark.schema";

// ========= Get all bookmarks ===========
export async function getBookmarks() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user?.id);

  if (error) throw error;

  return data;
}

// ======= Get tags ========

export async function getTags(): Promise<string[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bookmarks")
    .select("tags")
    .eq("user_id", user?.id);

  if (error) throw error;

  const tags = data?.flatMap((item) => item.tags || []).filter(Boolean);

  return [...new Set(tags)];
}

// ======== create bookmark =========

export async function createBookmark(input: CreateBookmarkInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([
      {
        ...input,
        user_id: user?.id,
        pinned: false,
        is_archived: false,
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

// ========= archive bookmark =======
type ArchiveInput = {
  id: string;
  is_archived: boolean;
};

export async function archiveBookmark({ id, is_archived }: ArchiveInput) {
  const { data, error } = await supabase
    .from("bookmarks")
    .update({ is_archived: !is_archived })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Archive error:", error);
    throw error;
  }

  return data;
}
