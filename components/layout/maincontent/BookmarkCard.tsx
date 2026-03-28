import { BookmarkCardProps } from "@/utils/types";
import React from "react";
import Image from "next/image";
import { ActionMenu } from "./ActionMenu";
import { getFavicon } from "@/utils/helpers";
function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <article className=" w-full flex flex-col bg-card dark:border-none border border-border rounded-[10px] p-4">
      {/* header */}
      <div className="flex items-start gap-2 shrink-0">
        <Image
          src={getFavicon(bookmark.url)}
          alt={bookmark.title}
          width={44}
          height={44}
          className="rounded-[10px] border border-accent"
        />
        <div className="mr-auto min-w-0">
          <h3 className="text-preset-3">{bookmark.title}</h3>
          <p className="text-preset-5 text-muted">{bookmark.url}</p>
        </div>
        <ActionMenu bookmark={bookmark} />
      </div>

      {/* description */}
      <p className="mt-4 text-muted-foreground">{bookmark.description}</p>

      {/* tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {bookmark.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs bg-accent rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className="mt-auto pt-4 border-t flex items-center gap-4 text-sm text-muted-foreground">
        <span>{bookmark.visitCount} visits</span>
      </div>
    </article>
  );
}

export default BookmarkCard;
