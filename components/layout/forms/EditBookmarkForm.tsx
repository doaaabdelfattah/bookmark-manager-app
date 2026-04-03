import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "radix-ui";
import React from "react";
import { BookmarkForm } from "./BookmarkForm";

export default function EditBookmarkForm({
  setIsEditOpen,
  bookmark,
  isEditOpen,
}) {
  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <BookmarkForm
            setOpen={setIsEditOpen}
            bookmarkId={bookmark.id}
            initialData={{
              title: bookmark.title,
              url: bookmark.url,
              description: bookmark.description,
              tags: bookmark.tags,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
