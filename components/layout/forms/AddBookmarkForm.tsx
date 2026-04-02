"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateBookmarkInput,
  createBookmarkSchema,
} from "@/lib/api/validation/bookmark.schema";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { useTags } from "@/hooks/useTags";
import TagsInput from "./TagsInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "@/lib/api/bookmarks";

export function AddBookmarkForm({ setOpen }) {
  const { tags } = useTags();
  console.log(tags);
  const form = useForm<CreateBookmarkInput>({
    resolver: zodResolver(createBookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      tags: [],
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      form.reset();
      toast("Bookmark added");
      setOpen(false);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(data: CreateBookmarkInput) {
    console.log(data);
    mutation.mutate(data);
  }
  return (
    <Dialog>
      <form id="add-bookmark-form" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-preset-1">Add Bookmark</DialogTitle>
          <DialogDescription className="text-preset-4-medium">
            Save a link with details to keep your collection organized. We
            extract the favicon automatically from the URL.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="my-8">
          {/* ====== title ===== */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title *</FieldLabel>
                <Input {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* ==== Description ========== */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Description * </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    rows={4}
                    className="min-h-22.5 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                <span className="text-preset-5 text-muted-foreground text-right">
                  {" "}
                  {field.value?.length || 0}/280
                </span>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {/* ====== URL =============== */}
          <Controller
            name="url"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Website URL *</FieldLabel>
                <Input {...field} />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* ============== tags ================== */}

          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <TagsInput
                value={field.value || []}
                onChange={field.onChange}
                error={fieldState.error}
                allTags={tags}
              />
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add Bookmark"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
