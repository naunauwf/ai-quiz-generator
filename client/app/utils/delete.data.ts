import { supabase } from "./load.env";

export async function deleteImage(id: number, publicUrl: string): Promise<boolean> {
  try {
    // 1. Ekstrak file path relatif dari publicUrl
    // Contoh publicUrl: "https://xxx.supabase.co/storage/v1/object/public/assets/upload/1723001234.png"
    // Diambil dari bagian setelah "/assets/" -> "upload/1723001234.png"
    const filePath: string = publicUrl.split("/assets/")[1];

    if (filePath) {
      // remove file from supabase storage
      const { error: storageError } = await supabase.storage
        .from("assets")
        .remove([filePath]);

      if (storageError) {
        console.error("Failed remove file from Storage:", storageError.message);
        return false;
      }
    }

    // delete the data row from the 'images' table
    const { error: dbError } = await supabase
      .from("images")
      .delete()
      .eq("id", id);

    if (dbError) {
      console.error("Failed to delete from the database");
      return false;
    }

    console.log("Successfully deleted photo");
    return true;
  } catch (err) {
    console.error("Error during the delete process:", err);
    return false;
  }
}
