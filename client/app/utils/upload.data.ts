import { supabase } from "./load.env";

export async function uploadImage(
  file: File,
  title: string,
  description: string,
): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `upload/${fileName}`;

  // upload files to the supabase 'assets' storage bucket
  const { data, error } = await supabase.storage
    .from("assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error(`Upload Storage Error: ${error.message}`);
    return null;
  }

  // get public url from storage
  const { data: publicUrlData } = supabase.storage
    .from("assets")
    .getPublicUrl(data.path);

  console.log("Upload Result:", data);

  const publicUrl = publicUrlData.publicUrl;
  console.log("Public URL:", publicUrl);

  // save the public url, title, description to the 'image_url' column in the 'images' table
  const { error: dberror } = await supabase.from("images").insert([
    {
      image_url: publicUrl,
      title: title,
      description: description,
    },
  ]);
  console.log("Insert data:", {
    image_url: publicUrl,
    title,
    description,
  });

  if (dberror) {
    console.error(`Database Insert Error: ${dberror.message}`);
    return null;
  }

  return publicUrl;
}
