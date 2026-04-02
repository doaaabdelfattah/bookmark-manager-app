import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "@/public/assets/images/icon-logout.svg";
import ThemePalette from "@/public/assets/images/icon-theme.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { signOut } from "@/lib/api/auth";

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar size="lg">
            <AvatarImage
              src="/assets/images/image-avatar.webp"
              alt="avatar image"
            />
            {/* <AvatarFallback>CN</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-62">
        <DropdownMenuGroup>
          {/* ===== first item ==== */}
          <DropdownMenuItem className="focus:bg-transparent">
            <div className="flex items-center w-full gap-4 ">
              <Avatar size="lg">
                <AvatarImage
                  src="/assets/images/image-avatar.webp"
                  alt="shadcn"
                />
                {/* <AvatarFallback>CN</AvatarFallback> */}
              </Avatar>
              <span>
                <p className="text-sidebar-foreground">Emily Carter</p>
                <p className="text-preset-4-medium text-muted-foreground">
                  emily101@gmail.com
                </p>
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* ====== second item ========= */}
          <DropdownMenuItem className=" flex justify-between items-center ">
            <span className="flex items-center justify-center gap-2 ">
              <ThemePalette />
              Theme
            </span>
            <ModeToggle />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
            <Logout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
