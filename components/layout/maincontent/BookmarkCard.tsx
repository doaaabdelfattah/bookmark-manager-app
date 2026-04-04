import { BookmarkCardProps } from "@/utils/types";
import Eye from "@/public/assets/images/icon-visit-count.svg";
import LastVisited from "@/public/assets/images/icon-last-visited.svg";
import IconCreated from "@/public/assets/images/icon-created.svg";
import PinIcon from "@/public/assets/images/icon-pin.svg";
import Image from "next/image";
import { ActionMenu } from "./ActionMenu";
import { getFavicon } from "@/utils/helpers";
import { formatDateShort } from "@/utils/helpers";
function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <article className=" w-full flex flex-col bg-card dark:border-none border border-border gap-4 rounded-[10px] p-4">
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
          <h3 className="text-preset-2 capitalize">{bookmark.title}</h3>
          <p className="text-preset-5 text-muted-foreground wrap-break-word">
            {bookmark.url}
          </p>
        </div>
        <ActionMenu bookmark={bookmark} />
      </div>
      <hr className="text-accent " />

      {/* description */}
      <p className=" text-muted-foreground">{bookmark.description}</p>

      {/* tags */}
      <div className=" flex flex-wrap gap-2">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-muted-foreground text-preset-5 bg-background rounded-md cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* footer */}
      <div className="mt-auto pt-4 border-t flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="h-5 w-5" /> {bookmark.visit_count}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <LastVisited className="h-4 w-4" />{" "}
          {formatDateShort(bookmark.last_visited_at)}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <IconCreated className="h-4 w-4" />
          {formatDateShort(bookmark.created_at)}
        </div>
        {bookmark.pinned && <PinIcon className="ml-auto" />}
        {bookmark.is_archived && (
          <span className="px-2 py-1 ml-auto text-muted-foreground text-preset-5 bg-background rounded-md cursor-pointer">
            Archived
          </span>
        )}
      </div>
    </article>
  );
}

export default BookmarkCard;
