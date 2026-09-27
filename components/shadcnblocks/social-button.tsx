import { Slot } from "radix-ui";
import {
  FaApple,
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMicrosoft,
  FaXTwitter,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
export type SocialProvider =
  | "google"
  | "github"
  | "apple"
  | "microsoft"
  | "twitter"
  | "discord"
  | "facebook"
  | "linkedin";

type SocialButtonVariant = "default" | "outline";

const providerConfig: Record<
  SocialProvider,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  google: { icon: FcGoogle, label: "Continue with Google" },
  github: { icon: FaGithub, label: "Continue with GitHub" },
  apple: { icon: FaApple, label: "Continue with Apple" },
  microsoft: { icon: FaMicrosoft, label: "Continue with Microsoft" },
  twitter: { icon: FaXTwitter, label: "Continue with X" },
  discord: { icon: FaDiscord, label: "Continue with Discord" },
  facebook: { icon: FaFacebook, label: "Continue with Facebook" },
  linkedin: { icon: FaLinkedin, label: "Continue with LinkedIn" },
};

export interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: SocialProvider;
  variant?: SocialButtonVariant;
  showIconOnly?: boolean;
  asChild?: boolean;
}

export const SocialButton = ({
  provider,
  variant = "default",
  showIconOnly = false,
  asChild = false,
  children,
  className,
  ...props
}: SocialButtonProps) => {
  const { icon: Icon, label } = providerConfig[provider];
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : "button"}
      className={cn(
        buttonVariants({
          variant,
          size: showIconOnly ? "icon" : "default",
        }),
        "gap-2",
        className,
      )}
      aria-label={showIconOnly ? label : undefined}
      {...props}
    >
      <Icon className="size-4 shrink-0" />
      {!showIconOnly && (children ?? label)}
    </Comp>
  );
};
