import React from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "@/lib/api/auth";
function SignupForm() {
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
  router.push("/login");
}
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  function onSubmit(data: SignUpSchemaInput) {
    console.log(data);
    mutation.mutate(data);
  }
  return (
    <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
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
              <Input {...field} />
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
              {mutation.isPending ? "Creating..." : "Create Account"}
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <a href="#">Sign in</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}

export default SignupForm;
