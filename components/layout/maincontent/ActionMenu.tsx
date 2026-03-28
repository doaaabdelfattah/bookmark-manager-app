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

export function ActionMenu({ bookmark }: BookmarkCardProps) {
  const [isOpenArchive, setIsOpenArchive] = useState(false);

  const actions = useBookmarkActions(bookmark, {
    onArchive: () => setIsOpenArchive(true),
    onEdit: () => {},
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
                onSelect={(e) => {
                  e.preventDefault();
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
        title="Archive bookmark"
        confirm="Archive"
        open={isOpenArchive}
        setOpen={setIsOpenArchive}
        action={() => console.log("archive bookmark")}
      >
        Are you sure you want to archive this bookmark?
      </AlertDialogBasic>
    </>
  );
}
