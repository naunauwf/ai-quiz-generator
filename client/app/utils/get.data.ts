import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import fs from "fs";

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

  fs.writeFileSync("./supabase.image.url.json", JSON.stringify(data, null, 2));

  // simpan log ke file JSON di folder supabase/log/
  // try {
  //   const dirPath = path.join(process.cwd(), "supabase", "log");
  //   const filePath = path.join(dirPath, "supabase.image.url.json");

  // buat folder jika belum ada
  // if (!fs.existsSync(dirPath)) {
  //   fs.mkdirSync(dirPath, { recursive: true });
  // }

  // write data ke json file
  //   fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  //   console.log("Current Directory:", process.cwd())
  // } catch (error) {
  //   console.error("Gagal menyimpan file log JSON:", error);
  // }

  console.log(JSON.stringify(data, null, 2));

  return data ?? [];
}
