import SignupForm from "@/components/layout/forms/SignupForm";
import Logo from "@/components/layout/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="min-w-112.5">
        <CardHeader className="">
          <Logo className="my-6 " lightClassName="w-2/3" />
          <CardTitle className="text-accent-foreground text-preset-1 ">
            Create an account
          </CardTitle>
          <CardDescription className="text-preset-4-medium text-muted-foreground ">
            Join us and start saving your favorite links — organized,
            searchable, and always within reach.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
