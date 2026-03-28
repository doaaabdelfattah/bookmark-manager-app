import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/bookmarks";

export function useTags() {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return {
    tags: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
