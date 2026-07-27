"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { uploadImage } from "../utils/upload.data";
import Image from "next/image";

export default function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // save file & create local preview (not yet uploaded)
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      // temporary preview in the browser
    }
  }

  // upload image & save to db upon form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      alert("Pilih gambar terlebih dahulu!");
      console.log("File tidak ada!");
      return;
    }

    setLoading(true);
    const url = await uploadImage(file, title, description);
    setLoading(false);

    if (url) {
      alert("Data and Image successfully saved!");
      setFile(null);
      setTitle("");
      setDescription("");
      setPreviewUrl(null);
      router.refresh();
    } else {
      alert("Failed to save data");
    }
  }

  return (
    <main className="flex justify-center items-center transition-all">
      <form
        className="flex-row items-center justify-center w-full sm:w-auto p-5 rounded-lg mb-5"
        onSubmit={handleSubmit}
      >
        <Input
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="masukan titlenya yh..."
          required
        />
        <Input
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="masukan descriptionya yh..."
          required
        />

        {/* Input select file (not yet uploaded) */}
        <div className="flex flex-col items-start mb-4">
          <label className="block text-brand-dark font-bold mb-2 text-sm">
            Upload Foto <span className="text-red-500">*</span>
          </label>
          {/* upload photo */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden text-xs border-2 rounded-md bg-green-300 hover:bg-green-400 p-1 w-20 font-bold text-brand-dark"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs rounded-lg bg-gray-300 hover:bg-gray-400 p-1 font-bold text-brand-dark "
          >
            {file ? "Ganti Foto?" : "Upload"}
          </button>
          {/* Local image preview */}
          {previewUrl && (
            <div className="mb-4">
              <p className=" text-xs mb-1 text-brand-dark">Preview Foto:</p>
              <Image
                src={previewUrl}
                alt="Preview Image"
                width={130}
                height={130}
                className="rounded-lg object-cover w-36"
                unoptimized
              />
            </div>
          )}
          <button
            className="mt-3 text-xs sm:text-sm px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-brand-dark font-bold transition-all"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit Data"}
          </button>
        </div>
      </form>
    </main>
  );
}
