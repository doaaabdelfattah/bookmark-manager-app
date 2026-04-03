import {
  archiveBookmark,
  deleteBookmark,
  updateLastVisited,
} from "@/lib/api/bookmarks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useBookmarkMutations() {
  const queryClient = useQueryClient();

  const archive = useMutation({
    mutationFn: archiveBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
  const deleteB = useMutation({
    mutationFn: deleteBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
  const visit = useMutation({
    mutationFn: updateLastVisited,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });
  return { archive, visit, deleteB };
}
