function BookmarkSkeleton() {
  return (
    <div className="w-full flex flex-col bg-card border border-border rounded-[10px] p-4 animate-pulse">
      {/* header */}
      <div className="flex items-start gap-2">
        <div className="w-11 h-11 rounded-[10px] bg-muted" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-muted rounded" />
          <div className="h-3 w-1/2 bg-muted rounded" />
        </div>
      </div>

      {/* description */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
      </div>

      {/* tags */}
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-12 bg-muted rounded" />
        <div className="h-5 w-10 bg-muted rounded" />
      </div>

      {/* footer */}
      <div className="mt-4 h-3 w-20 bg-muted rounded" />
    </div>
  );
}

export default BookmarkSkeleton;
