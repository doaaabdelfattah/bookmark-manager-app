"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
  signUpSchema,
  SignUpSchemaInput,
} from "@/lib/api/validation/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/lib/api/auth";
import Link from "next/link";

function SignupForm() {
  const router = useRouter();
  const form = useForm<SignUpSchemaInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully");
      form.reset();
      router.push("/auth/signin");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  function onSubmit(data: SignUpSchemaInput) {
    console.log(data);
    mutation.mutate(data);
  }
  return (
    <form
      id="signup-form"
      className="mt-2"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Full Name *</FieldLabel>
              <Input {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email address *</FieldLabel>
              <Input type="email" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Password *</FieldLabel>
              <Input type="password" {...field} />
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldGroup>
          <Field>
            <Button
              className="mb-6"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Account"}
            </Button>
            <FieldDescription className="px-6 text-center text-preset-4-medium">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-foreground ml-2 text-preset-4 !no-underline"
              >
                Sign in
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}

export default SignupForm;
