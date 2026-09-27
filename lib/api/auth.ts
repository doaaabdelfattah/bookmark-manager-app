import supabase from "../supaBase";
import { SignInSchemaInput, SignUpSchemaInput } from "./validation/auth.schema";

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
export async function signIn(input: SignInSchemaInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });
  console.log(data);
  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw error;
  }
}
export async function googleAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log("GOOGLE DATA:", data);
  console.log("GOOGLE ERROR:", error);

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}
