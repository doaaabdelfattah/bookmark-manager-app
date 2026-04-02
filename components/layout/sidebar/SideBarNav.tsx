import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTags } from "@/hooks/useTags";

function SideBarNav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedTags = searchParams.getAll("tag");
  // tag function to add tag to url and remove
  function toggleTag(tag: string) {
    // convert searchParams to object
    const params = new URLSearchParams(searchParams);
    // get all tags
    const tags = params.getAll("tag");
    // if the tag check is included -> remove it
    if (tags.includes(tag)) {
      const newTags = tags.filter((t) => t !== tag);
      params.delete("tag");
      newTags.forEach((t) => params.append("tag", t));
    }
    // it the tag check isn't included -> add it
    else {
      params.append("tag", tag);
    }
    // go to that url
    router.replace(`?${params.toString()}`);
  }
  const { tags } = useTags();
  return (
    <FieldGroup className="">
      {tags.map((tag) => (
        <Field
          key={tag.name}
          className="text-muted-foreground flex justify-between rounded-md hover:bg-accent w-full px-3 py-3 "
          orientation="horizontal"
        >
          <div className="flex items-start gap-2">
            <Checkbox
              id={tag.name}
              checked={selectedTags.includes(tag.name)}
              onCheckedChange={() => toggleTag(tag.name)}
            />
            <Label htmlFor={tag.name}>{tag.name}</Label>
          </div>
          <span className="text-muted-foreground text-xs rounded-full bg-background flex items-center justify-center w-5 h-5">
            {tag.count}
          </span>
        </Field>
      ))}
    </FieldGroup>
  );
}

export default SideBarNav;
