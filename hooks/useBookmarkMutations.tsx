import {
  archiveBookmark,
  deleteBookmark,
  togglePin,
  updateLastVisited,
} from "@/lib/api/bookmarks";
import PinIcon from "@/public/assets/images/icon-pin.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import DeleteIcon from "@/public/assets/images/icon-delete.svg";
import ArchiveIcon from "@/public/assets/images/icon-archive.svg";

export function useBookmarkMutations() {
  const queryClient = useQueryClient();

  const archive = useMutation({
    mutationFn: archiveBookmark,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      const wasArchived = variables.is_archived;
      toast.success(wasArchived ? "Bookmark restored." : "Bookmark archived", {
        icon: <ArchiveIcon className="text-[#014745] dark:text-white" />,
      });
    },
  });
  const deleteB = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Bookmark deleted.", {
        icon: <DeleteIcon className="text-[#014745] dark:text-white" />,
      });
    },
  });
  const visit = useMutation({
    mutationFn: updateLastVisited,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
  const pin = useMutation({
    mutationFn: togglePin,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      const wasPinned = variables.pinned;
      toast.success(wasPinned ? "Bookmark unpinned" : "Bookmark pinned", {
        icon: <PinIcon className="text-[#014745] dark:text-white" />,
      });
    },
  });
  return { archive, visit, deleteB, pin };
}
