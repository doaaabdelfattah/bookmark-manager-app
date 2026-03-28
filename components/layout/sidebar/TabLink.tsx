import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
type TabLinkProps = {
  value: string;
  href: string;
  children: React.ReactNode;
};

function TabLink({ value, children, href }: TabLinkProps) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const isActive = value === "home" ? !tab : tab === value;

  return (
    <Link
      href={href}
      className={`w-full focus-visible:ring-offset-1 focus-visible:ring-ring text-muted-foreground text-preset-3 focus-visible:ring-2 px-3 py-2 gap-2 flex rounded-md transition hover:bg-accent
        ${isActive ? "bg-accent text-sidebar-foreground" : ""}
      `}
    >
      {children}
    </Link>
  );
}

export default TabLink;
