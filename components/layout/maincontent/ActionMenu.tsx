import { Button } from "@/components/ui/button";
import MenuBookmarkIcon from "@/public/assets/images/icon-menu-bookmark.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkCardProps } from "@/utils/types";
import { useBookmarkActions } from "@/hooks/useBookmarkActions";
import { AlertDialogBasic } from "@/components/dialogs/AlertDialogBasic";
import { useState } from "react";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { BookmarkForm } from "../forms/BookmarkForm";
import { useBookmarkMutations } from "@/hooks/useBookmarkMutations";

export function ActionMenu({ bookmark }: BookmarkCardProps) {
  const [isOpenArchive, setIsOpenArchive] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { archive, deleteB, visit, pin } = useBookmarkMutations();

  const actions = useBookmarkActions(bookmark, {
    onArchive: () => setIsOpenArchive(true),
    onEdit: () => setIsEditOpen(true),
    onVisit: () => {
      visit.mutate({
        id: bookmark.id,
        currentCount: bookmark.visit_count,
      });
      window.open(bookmark.url, "_blank");
    },
    onDelete: () => setIsOpenDelete(true),
    onPin: () =>
      pin.mutate({
        id: bookmark.id,
        pinned: bookmark.pinned,
      }),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8" variant="outline">
            <MenuBookmarkIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-50">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenuItem
                key={action.id}
                onSelect={() => {
                  action.onSelect();
                }}
                className="flex items-center gap-3 cursor-pointer"
              >
                {Icon && <Icon />}
                {action.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ========= Alert For Archive =========== */}
      <AlertDialogBasic
        title={bookmark.is_archived ? "Unarchive bookmark" : "Archive bookmark"}
        confirm={bookmark.is_archived ? "Unarchive" : "Archive"}
        open={isOpenArchive}
        setOpen={setIsOpenArchive}
        action={() => {
          archive.mutate({
            id: bookmark.id,
            is_archived: bookmark.is_archived,
          });
          setIsOpenArchive(false);
        }}
      >
        Are you sure you want to archive this bookmark?
      </AlertDialogBasic>
      {/* ========= Alert For Delete =========== */}
      <AlertDialogBasic
        title="Delete bookmark"
        confirm="Delete permanently"
        variant="destructive"
        open={isOpenDelete}
        setOpen={setIsOpenDelete}
        action={() => {
          deleteB.mutate({
            id: bookmark.id,
          });
          setIsOpenDelete(false);
        }}
      >
        Are you sure you want to delete this bookmark?
      </AlertDialogBasic>

      {/* =========== Dialog for Edit bookmark ========= */}
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
