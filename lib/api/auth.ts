import supabase from "../supaBase";
import { SignUpSchemaInput } from "./validation/auth.schema";

export async function signUp(input: SignUpSchemaInput) {
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: {
        name: input.name,
      },
    },
  });
  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
