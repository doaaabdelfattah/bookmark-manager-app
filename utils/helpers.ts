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

export function getFavicon(url: string) {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return "/favicon-placeholder.png";
  }
}
