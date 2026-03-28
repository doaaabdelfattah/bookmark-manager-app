"use client";
import { useState } from "react";
import Sorting from "@/public/assets/images/icon-sort.svg";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function DropDownMenu() {
  const [position, setPosition] = useState("bottom");
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort") ?? "recent";

  function changeSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.replace(`?${params.toString()}`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className="text-accent-foreground" variant="outline">
          <Sorting className="w-4 h-4" /> Sort by
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={sort} onValueChange={changeSort}>
            <DropdownMenuRadioItem value="recent">
              Recently added
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="visited">
              Recently visited
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="popular">
              Most visited
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropDownMenu;
