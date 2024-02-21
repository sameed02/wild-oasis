import supabase from "./supabase.js";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  // fetching userSession
  const { data: userSession } = await supabase.auth.getSession();

  // return null if there is no session
  if (!userSession.session) return null;

  // fetch curren user if there is userSession
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
