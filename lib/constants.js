import HomeIcon from "@/public/assets/images/icon-home.svg";
import ArchiveIcon from "@/public/assets/images/icon-archive.svg";

export const sidebarTabs = [
  {
    label: "Home",
    value: "home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Archived",
    value: "archived",
    href: "/?tab=archived",
    icon: ArchiveIcon,
  },
];