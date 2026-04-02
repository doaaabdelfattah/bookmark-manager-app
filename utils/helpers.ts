import { Bookmark } from "./types";

export function getTagsWithCount(bookmarks: Bookmark[]) {
  const tagMap: Record<string, number> = {};

  bookmarks.forEach((bookmark) => {
    bookmark.tags.forEach((tag) => {
      tagMap[tag] = (tagMap[tag] || 0) + 1;
    });
  });

  return Object.entries(tagMap).map(([name, count]) => ({
    name,
    count,
  }));
}

// ======== get favicon of the website ========
export function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "/favicon-placeholder.png";
  }
}

// ======== Format time =========

export function formatDateShort(dateString?: string | null) {
  if (!dateString) return "Never";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
