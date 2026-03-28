import Link from "next/link";
import LogoLight from "@/public/assets/images/logo-light-theme.svg";
import LogoDark from "@/public/assets/images/logo-dark-theme.svg";
type LogoProps = {
  className?: string;
  lightClassName?: string;
  darkClassName?: string;
};

function Logo({ className, lightClassName, darkClassName }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <LogoLight className={`block dark:hidden ${lightClassName || ""}`} />
      <LogoDark className={`hidden dark:block ${darkClassName || ""}`} />
    </Link>
  );
}

export default Logo;
