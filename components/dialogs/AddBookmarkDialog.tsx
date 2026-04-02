"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AddBookmarkForm } from "@/components/layout/forms/AddBookmarkForm";
import AddIcon from "@/public/assets/images/icon-add.svg";
import { Button } from "../ui/button";
import { useState } from "react";

export default function AddBookmarkDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="lg" variant="default">
          <AddIcon className="w-4 h-4 flex items-center justify-center" />
          <span className="max-sm:hidden">Add Bookmark</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          <VisuallyHidden>Add Bookmark</VisuallyHidden>
        </DialogTitle>
        <AddBookmarkForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
