"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadImage } from "../utils/upload.data";

export default function UploadImageButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) {
      return null;
    }

    setLoading(true);
    const url = await uploadImage(file, title, description);
    setLoading(false);

    if (url) {
      alert("Gambar berhasil diupload dan disimpan ke Database!");
      // automatically refresh the server data page
      router.refresh();
    } else {
      alert("Gagal mengupload gambar");
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
        className="text-gray-200 w-20 h-7 leading-2 border-white border p-1 rounded-xl bg-gray-200 text-[12px] font-bold m-2.5 text-center hover:bg-gray-300 transition-all cursor-pointer disabled:opacity-50"
      >
        {loading ? "Uploading.." : "Upload File"}
      </button>
    </div>
  );
}
