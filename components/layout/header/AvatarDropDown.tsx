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
import { useAuth } from "@/hooks/useAuth";

export function AvatarDropdown() {
  const { user, loading } = useAuth();
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar size="lg">
            <AvatarImage
              key={avatarUrl}
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.full_name || "User"}
            />
            {/* <AvatarFallback>
              {user?.user_metadata?.full_name?.charAt(0) || "U"}
            </AvatarFallback> */}
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
                  src={user?.user_metadata?.avatar_url}
                  alt={user?.user_metadata?.full_name || "User"}
                />
                {/* <AvatarFallback>CN</AvatarFallback> */}
              </Avatar>
              <span>
                <p className="text-sidebar-foreground">
                  {user?.user_metadata?.name}
                </p>
                <p className="text-preset-4-medium text-muted-foreground">
                  {user?.email}
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
