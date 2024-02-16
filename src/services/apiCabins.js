import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  // uploading image

  const { error: storageError } = await supabase.storage
    .from("cabin-images") // bucket-name from supabase
    .upload(imageName, newCabin.image);

  // delete cabin if there was problem in uploading corresponding image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("cabin image could not be uploaded & cabin wasn't created");
  }
}

export async function updateCabin(modifiedCabin, hasNewImage, ediId) {
  if (hasNewImage) {
    const imageName = `${Math.random()}-${modifiedCabin.image.name}`.replaceAll(
      "/",
      ""
    );
    const imagePath = await uploadImage(modifiedCabin.image, imageName);

    const { data, error } = await supabase
      .from("cabins")
      .update({ ...modifiedCabin, image: imagePath })
      .eq("id", ediId)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("cabin could not be updated");
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("cabins")
      .update({ ...modifiedCabin })
      .eq("id", ediId)
      .select()
      .single();

    if (error) {
      console.error(error);
      throw new Error("cabin could not be updated");
    }
    return data;
  }
}

export async function duplicateCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }

  return data;
}

async function uploadImage(image, imageName) {
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Image upload failed");
  }

  return imagePath;
}
