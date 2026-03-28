import BookmarkCard from "./BookmarkCard";
import { Bookmark } from "@/lib/api/validation/bookmark.schema";
import BookmarkSkeleton from "./BookmarkSkeleton";
type Props = {
  bookmarks: Bookmark[];
  isLoading: boolean;
};
function BookmarksList({ bookmarks, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <BookmarkSkeleton key={i} />
          ))}
        </>
      ) : (
        bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))
      )}
    </>
  );
}

export default BookmarksList;
