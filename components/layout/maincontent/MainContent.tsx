"use client";
import DropDownMenu from "./DropDownMenu";
import BookmarksList from "./BookmarksList";
import { useRouter, useSearchParams } from "next/navigation";
import { filterBookmarks, SortOption } from "@/utils/filterBookmarks";
import { useEffect } from "react";
import { getBookmarks } from "@/lib/api/bookmarks";
import { useQuery } from "@tanstack/react-query";

export default function MainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") ?? "all";
  const query = searchParams.get("query") ?? "";
  const tags = searchParams.getAll("tag") ?? [];
  const sort = (searchParams.get("sort") ?? "recent") as SortOption;

  const { data, isLoading } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
  useEffect(() => {
    if (searchParams.toString()) {
      router.replace("/");
    }
  }, []);

  let title = "All Bookmarks";

  if (query) {
    title = `Search results for: ${query}`;
  } else if (tags.length > 0) {
    const formattedTags = tags
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
      .join(", ");
    title = `Bookmarks tagged: ${formattedTags}`;
  }

  const bookmarks = filterBookmarks(data || [], {
    tab,
    query,
    tags,
    sort,
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-preset-1 text-foreground">{title}</h1>
        <DropDownMenu />
      </div>
      {!isLoading && bookmarks.length === 0 ? (
        <p className="mt-10 text-center text-muted-foreground">
          {query
            ? "No bookmarks match your search."
            : "You don't have any bookmarks yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
          <BookmarksList bookmarks={bookmarks} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
