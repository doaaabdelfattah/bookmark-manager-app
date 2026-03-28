"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  }
  return (
    <InputGroup className="md:max-w-sm">
      <InputGroupInput
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search by Title..."
        defaultValue={searchParams.get("query")?.toString()}
      />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
    </InputGroup>
  );
}

export default SearchBar;
