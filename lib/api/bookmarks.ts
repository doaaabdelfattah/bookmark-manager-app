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
type TagWithCount = {
  name: string;
  count: number;
};

export async function getTags(): Promise<TagWithCount[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("bookmarks")
    .select("tags, is_archived")
    .eq("user_id", user.id);

  if (error) throw error;

  const tagMap: Record<string, number> = {};

  data.forEach((item) => {
    if (item.is_archived) return;

    item.tags?.forEach((tag: string) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  // tagMap = {react:2, js:2, css:1}

  // Convert to array ====== [['react', 2], ['js',2]]
  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
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
        visit_count: 0,
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

// ============ Update last visits =============
type VistsInput = {
  id: string;
  currentCount: number;
};
export async function updateLastVisited({ id, currentCount }: VistsInput) {
  const { error } = await supabase
    .from("bookmarks")
    .update({
      visit_count: currentCount + 1,
      last_visited_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update visit error:", error);
    throw error;
  }
}

// ============= Update Bookmark =============
export async function updateBookmark({
  id,
  data,
}: {
  id: string;
  data: Partial<CreateBookmarkInput>;
}) {
  const { error } = await supabase.from("bookmarks").update(data).eq("id", id);

  if (error) throw error;
}

// ============ DELETE bookmark
export async function deleteBookmark({ id }: { id: string }) {
  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if (error) {
    console.error("Update visit error:", error);
    throw error;
  }
}

//================ toggle pin/unpin ==========
export async function togglePin({
  id,
  pinned,
}: {
  id: string;
  pinned: boolean;
}) {
  const { error } = await supabase
    .from("bookmarks")
    .update({ pinned: !pinned })
    .eq("id", id);

  if (error) throw error;
}
