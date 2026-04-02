import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/bookmarks";

type TagWithCount = {
  name: string;
  count: number;
};
export function useTags() {
  const query = useQuery<TagWithCount[]>({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return {
    tags: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
