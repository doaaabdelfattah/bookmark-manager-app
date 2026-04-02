import SearchBar from "./SearchBar";
import { Button } from "../../ui/button";
import AddIcon from "@/public/assets/images/icon-add.svg";
import MenuIcon from "@/public/assets/images/icon-menu-hamburger.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarDropdown } from "./AvatarDropDown";
import AddBookmarkDialog from "@/components/dialogs/AddBookmarkDialog";
type HeaderProps = {
  toggleSidebar: () => void;
};

function Header({ toggleSidebar }: HeaderProps) {
  return (
    <div className="flex items-center justify-between w-full gap-4 h-10  ">
      {/* ========== Left side ======== */}
      <div className="flex items-center max-sm:w-2/3 gap-4 h-full">
        <button
          onClick={toggleSidebar}
          className="lg:hidden hover:bg-accent border p-3 flex items-center h-full rounded-lg"
        >
          <MenuIcon className="w-5 h-5" />
        </button>
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <AddBookmarkDialog />
        <AvatarDropdown />
      </div>
    </div>
  );
}

export default Header;
