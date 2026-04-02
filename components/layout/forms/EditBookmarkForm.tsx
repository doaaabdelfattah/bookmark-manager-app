import { DialogContent } from "@/components/ui/dialog";
import { Dialog } from "radix-ui";
import React from "react";
import { AddBookmarkForm } from "./AddBookmarkForm";

export default function EditBookmarkForm({
  setIsEditOpen,
  bookmark,
  isEditOpen,
}) {
  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <AddBookmarkForm
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
