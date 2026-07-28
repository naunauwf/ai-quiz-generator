"use client";
import Image from "next/image";
import { useState } from "react";
import Notification from "./Notification";

type CardProps = {
  title: string;
  description: string;
  src: string;
};

export default function Card({ title, description, src }: CardProps) {
  const [expanded, setExpanded] = useState(false);

  const MAX_LENGTH = 50;
  const isLong = description.length > MAX_LENGTH;

  return (
    <div className="w-37.5 h-56 sm:w-60 sm:h-80 rounded-xl overflow-hidden bg-white shadow-md">
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
    </div>
  );
}
