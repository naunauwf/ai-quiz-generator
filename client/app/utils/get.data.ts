import { cookies } from "next/headers";
import { createClient } from "./supabase/server";

export async function getData() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // ambil data dan error dari query
  const { data, error } = await supabase
    .from("images")
    .select("id, image_url, created_at, title, description")
    .order("created_at", { ascending: false });

  // log ke terminal server jika ada error query
  if (error) {
    console.error("Database Error:", error);
    return [];
  }

  return data ?? [];
}
