import supabase, { supabaseUrl } from "./supabase.js";

export async function signUp({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  let authError = null;

  // User exists, but is fake. See https://supabase.com/docs/reference/javascript/auth-signup
  if (data?.user && !data.user?.identities.length) {
    authError = {
      name: "AuthApiError",
      message: "This email has already been registered",
    };
  } else if (error) {
    authError = {
      name: error.name,
      message: error.message,
    };
  }

  if (authError) throw new Error(authError.message);

  return data;
}

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

export async function updateCurrentUser({ fullName, password, avatar }) {
  // update password or fullName
  let updateData;

  if (password) updateData = { password };

  if (fullName)
    updateData = {
      data: {
        fullName,
      },
    };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // upload avatar image
  const fileName = `avatar${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error("Image upload failed");

  // update avatar image

  const { data: updatedUser, error: updatedUserError } =
    await supabase.auth.updateUser({
      //^^^^^ MISSING
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updatedUserError) throw new Error(updatedUserError.message);

  return updatedUser;
}
