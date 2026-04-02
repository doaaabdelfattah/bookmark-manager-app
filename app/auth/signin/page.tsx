import SignInForm from "@/components/layout/forms/SignInForm";
import SignupForm from "@/components/layout/forms/SignupForm";
import Logo from "@/components/layout/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SigninPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-112.5">
        <CardHeader className="">
          <Logo className="my-8 " lightClassName="w-1/2" />
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
