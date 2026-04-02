import { Bookmark } from "./types";
export type SortOption = "recent" | "visited" | "popular";
type Filters = {
  tab: string;
  query: string;
  tags: string[];
  sort: SortOption;
};

export function filterBookmarks(
  data: Bookmark[],
  { tab, query, tags, sort }: Filters,
) {
  const sortFunctions = {
    recent: (a: Bookmark, b: Bookmark) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),

    visited: (a: Bookmark, b: Bookmark) =>
      new Date(b.lastVisited ?? 0).getTime() -
      new Date(a.lastVisited ?? 0).getTime(),

    popular: (a: Bookmark, b: Bookmark) => b.visitCount - a.visitCount,
  };

  return (
    data
      // archived
      .filter((b) => {
        if (tab === "archived") return b.is_archived;
        return true;
      })
      // search results
      .filter((b) => b.title.toLowerCase().includes(query.toLowerCase()))

      // tags

      .filter((b) => {
        if (tags.length === 0) return true;

        return tags.some((tag) =>
          b.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
        );
      })
      .sort((a, b) => {
        if (a.pinned !== b.pinned) {
          return a.pinned ? -1 : 1;
        }

        return sortFunctions[sort]?.(a, b) ?? 0;
      })
  );
}
