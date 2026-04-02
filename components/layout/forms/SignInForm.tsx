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
  signInSchema,
  SignInSchemaInput,
} from "@/lib/api/validation/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/lib/api/auth";
import Link from "next/link";

function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInSchemaInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      // toast.success("Account created successfully");
      form.reset();
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  function onSubmit(data: SignInSchemaInput) {
    // console.log(data);
    mutation.mutate(data);
  }
  return (
    <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Logging..." : "Log in"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Don’t have an account? <Link href="/auth/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}

export default SignInForm;
