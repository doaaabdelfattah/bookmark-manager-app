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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveBookmark, updateLastVisited } from "@/lib/api/bookmarks";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { AddBookmarkForm } from "../forms/AddBookmarkForm";

export function ActionMenu({ bookmark }: BookmarkCardProps) {
  const [isOpenArchive, setIsOpenArchive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const queryClient = useQueryClient();

  // ===== Archive Functions ================
  const archiveMutation = useMutation({
    mutationFn: archiveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      setIsOpenArchive(false);
    },
  });
  // ======== Update Vists Functions ================
  const visitMutation = useMutation({
    mutationFn: updateLastVisited,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  const actions = useBookmarkActions(bookmark, {
    onArchive: () => setIsOpenArchive(true),
    onEdit: () => setIsEditOpen(true),
    onVisit: () => {
      visitMutation.mutate({
        id: bookmark.id,
        currentCount: bookmark.visit_count,
      });

      window.open(bookmark.url, "_blank");
    },
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

      <AlertDialogBasic
        title={bookmark.is_archived ? "Unarchive bookmark" : "Archive bookmark"}
        confirm={bookmark.is_archived ? "Unarchive" : "Archive"}
        open={isOpenArchive}
        setOpen={setIsOpenArchive}
        action={() => {
          archiveMutation.mutate({
            id: bookmark.id,
            is_archived: bookmark.is_archived,
          });
          setIsOpenArchive(false);
        }}
      >
        Are you sure you want to archive this bookmark?
      </AlertDialogBasic>
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
