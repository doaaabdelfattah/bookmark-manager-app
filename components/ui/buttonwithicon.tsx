import { IconGitBranch } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function ButtonWithIcon({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={}>
        <IconGitBranch data-icon="inline-start" /> {text}
      </Button>
    </div>
  );
}
