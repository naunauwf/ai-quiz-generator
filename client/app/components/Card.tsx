"use client";
import Image from "next/image";
import { useState } from "react";
import Notification from "./Notification";
import { deleteImage } from "../utils/delete.data";
import { useRouter } from "next/navigation";

type CardProps = {
  id: number;
  title: string;
  description: string;
  src: string;
};

export default function Card({ id, title, description, src }: CardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const MAX_LENGTH = 50;
  const isLong = description.length > MAX_LENGTH;

  async function handleDelete() {
    setDeleting(true);
    const success = await deleteImage(id, src);
    setDeleting(false);

    if (success) {
      setShowConfirm(false);
      router.refresh();
    } else {
      alert("Failed delete image");
    }
  }

  return (
    <div className="w-37.5 h-56 sm:w-60 sm:h-80 rounded-xl overflow-hidden bg-white shadow-md relative group">
      {/* delete button */}
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="absolute top-2 right-2 z-10 bg-red-500/80 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold transition-all shadow-md cursor-pointer"
        title="Hapus foto"
      >
        X
      </button>
      <div className="relative w-full h-40 sm:h-52 ">
        <Image
          src={src}
          alt={title || "image"}
          className="w-full object-cover"
          fill
          loading="eager"
          unoptimized
        />
      </div>
      <div className="p-1 sm:p-3">
        <h2 className="text-sm sm:text-lg font-bold text-gray-900">
          {title || "untitled"}
        </h2>
        {/* description paragpah: hidden on mobile, show on desktop */}
        <p className="hidden sm:block line-clamp-4 sm:line-clamp-2 sm:text-sm text-xs sm:h-10 text-gray-700">
          {description || "No description provided."}
        </p>
        {/*the button that only show on mobile */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="block sm:hidden text-xs text-gray-600 hover:text-gray-700 cursor-pointer"
        >
          {`${expanded ? "Tutup" : "Description.."}`}
        </button>
        {/* button on desktop visible onnly if description is long */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm hidden sm:block text-gray-400 hover:text-gray-500 cursor-pointer"
          >
            {`${expanded ? "Tutup" : "Selengkapnya"}`}
          </button>
        )}
        {/* popup modal */}
        {expanded && (
          <Notification onClose={() => setExpanded(false)}>
            {description}
          </Notification>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-5 rounded-lg text-center max-w-xs w-full shadow-lg">
            <p className="text-gray-800 font-semibold mb-4 text-sm">
              Yakin nich mw hapus photo &quot;{title || "ini"}&quot;?
            </p>
            <div className="flex justify-center items-center gap-3">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Ya, Delete"}
              </button>
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
              >
                Batal ahh.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
