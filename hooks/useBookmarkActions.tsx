import { ActionItem } from "@/utils/types";
import { Bookmark } from "@/lib/api/validation/bookmark.schema";
import VisitIcon from "@/public/assets/images/icon-visit.svg";
import CopyIcon from "@/public/assets/images/icon-copy.svg";
import PinIcon from "@/public/assets/images/icon-pin.svg";
import EditIcon from "@/public/assets/images/icon-edit.svg";
import ArchiveIcon from "@/public/assets/images/icon-archive.svg";
import UnArchiveIcon from "@/public/assets/images/icon-unarchive.svg";
import CloseIcon from "@/public/assets/images/icon-close.svg";
import DeleteIcon from "@/public/assets/images/icon-delete.svg";
import { toast } from "sonner";

type BookmarkActionHandlers = {
  onEdit: () => void;
  onArchive: () => void;
  onVisit: () => void;
  onDelete: () => void;
};
export function useBookmarkActions(
  bookmark: Bookmark,
  handlers: BookmarkActionHandlers,
): ActionItem[] {
  const baseActions: ActionItem[] = [
    {
      id: "visit",
      label: "Visit",
      icon: VisitIcon,
      onSelect: handlers.onVisit,
    },
    {
      id: "copy",
      label: "Copy URL",
      icon: CopyIcon,
      onSelect: () => {
        navigator.clipboard.writeText(bookmark.url);

        toast.success("Link copied to clipboard.", {
          icon: <CopyIcon className="text-[#014745] dark:text-white" />,
          cancel: {
            label: <CloseIcon />,
            onClick: () => {},
          },
        });
      },
    },
    {
      id: "archive",
      label: bookmark.is_archived ? "Unarchive" : "Archive",
      icon: bookmark.is_archived ? UnArchiveIcon : ArchiveIcon,
      onSelect: handlers.onArchive,
    },
  ];

  if (bookmark.is_archived) {
    return [
      ...baseActions,
      {
        id: "delete",
        label: "Delete Permanently",
        icon: DeleteIcon,
        onSelect: handlers.onDelete,
      },
    ];
  }

  return [
    ...baseActions,
    {
      id: "pin",
      label: bookmark.pinned ? "Unpin" : "Pin",
      icon: PinIcon,
      onSelect: () => {
        toast.success("Bookmark pinned to top.", {
          icon: <PinIcon className="text-[#014745] dark:text-white" />,
        });
      },
    },
    {
      id: "edit",
      label: "Edit",
      icon: EditIcon,
      onSelect: handlers.onEdit,
    },
  ];
}

// export function useBookmarkActions(
//   bookmark: Bookmark,
//   handlers: BookmarkActionHandlers,
// ): ActionItem[] {
//   const actions: ActionItem[] = [
//     {
//       id: "visit",
//       label: "Visit",
//       icon: VisitIcon,
//       onSelect: handlers.onVisit,
//     },

//     {
//       id: "copy",
//       label: "Copy URL",
//       icon: CopyIcon,
//       onSelect: () => {
//         navigator.clipboard.writeText(bookmark.url);

//         toast.success("Link copied to clipboard.", {
//           icon: <CopyIcon className="text-[#014745] dark:text-white" />,
//           cancel: {
//             label: <CloseIcon />,
//             onClick: () => {},
//           },
//         });
//       },
//     },

//     {
//       id: "pin",
//       label: bookmark.pinned ? "Unpin" : "Pin",
//       icon: PinIcon,
//       onSelect: () => {
//         toast.success("Bookmark pinned to top.", {
//           icon: <PinIcon className="text-[#014745] dark:text-white" />,
//           cancel: {
//             label: <CloseIcon />,
//             onClick: () => {},
//           },
//         });
//       },
//     },

//     {
//       id: "edit",
//       label: "Edit",
//       icon: EditIcon,
//       onSelect: handlers.onEdit,
//     },

//     {
//       id: "archive",
//       label: bookmark.is_archived ? "Unarchive" : "Archive",
//       icon: ArchiveIcon,
//       onSelect: handlers.onArchive,
//     },
//   ];

//   return actions;
// }
