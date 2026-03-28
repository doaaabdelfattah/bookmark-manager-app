export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  created_at: string;
  lastVisited: string | null;
};

export type BookmarkCardProps = {
  bookmark: Bookmark;
};

export type ActionItem = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  // variant?: "default" | "destructive";
  onSelect: () => void;
};
