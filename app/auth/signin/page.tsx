import SignInForm from "@/components/layout/forms/SignInForm";
import Logo from "@/components/layout/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign in",
};
export default function SigninPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="lg:min-w-112.5 min-w-full">
        <CardHeader className="">
          <Logo className="my-6 " lightClassName="w-2/3" />
          <CardTitle className="text-accent-foreground text-preset-1 ">
            Log in to your account
          </CardTitle>
          <CardDescription className="text-preset-4-medium text-muted-foreground ">
            Welcome back! Please enter your details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
