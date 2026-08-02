"use client";

import { useRef, useState } from "react";
import Input from "./Input";
import { useRouter } from "next/navigation";
import { uploadImage } from "../utils/upload.data";
import Image from "next/image";

export default function Form() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

  function deletePreview() {
    setFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowConfirm(false);
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
    <div className="flex justify-center items-center transition-all">
      <form
        suppressHydrationWarning={true}
        className="flex-row min-w-fit items-center justify-center w-f p-5 rounded-lg mb-5"
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
            className="hidden"
            required
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs rounded-lg bg-gray-300   hover:bg-gray-400 px-2 py-1 font-semibold text-brand-dark cursor-pointer"
          >
            {file ? "Ganti Foto?" : "Upload"}
          </button>
          {/* Local image preview */}
          {previewUrl && (
            <div className=" mb-4">
              <p className="text-xs mb-1 text-brand-dark">Preview Foto:</p>
              <div className="relative">
                <Image
                  src={previewUrl}
                  alt="Preview Image"
                  width={130}
                  height={130}
                  className="rounded-lg object-cover w-36"
                  unoptimized
                />
                <div
                  onClick={() => setShowConfirm(true)}
                  className="cursor-pointer text-red-500 absolute transition-all -top-3 -right-3 text-lg hover:bg-gray-300 rounded-full w-7 h-7 text-center bg-gray-400/50 focus:bg-gray-400 font-extrabold hover:-translate-y-0.5"
                >
                  X
                </div>
                {showConfirm && (
                  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg text-center max-w-xs w-full shadow-lg">
                      <p className="text-gray-800 font-semibold mb-4 text-sm transition-all">
                        Yakin nich mau hapus?
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={deletePreview}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
                        >
                          Y
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowConfirm(false)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
                        >
                          G
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <button
            className="mt-3 text-xs sm:text-sm px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 text-brand-dark font-semibold transition-all cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit Data"}
          </button>
        </div>
      </form>
    </div>
  );
}
