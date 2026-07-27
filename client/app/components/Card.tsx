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
    <div>
      <div className="w-60 h-80 rounded-xl overflow-hidden bg-white shadow-md">
        <div className="relative w-full h-52">
          <Image
            src={src}
            alt={title || "image"}
            className="w-full h-50 object-cover"
            fill
            loading="eager"
            unoptimized
          />
        </div>
        <div className="p-3">
          <h2 className="text-lg font-bold mb-1 text-gray-900">
            {title || "untitled"}
          </h2>
          <p
            className={`${expanded ? "Selengkapnya hidden" : "line-clamp-2"}  text-gray-700 text-sm  `}
          >
            {description || "No description provided."}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-gray-400 hover:text-gray-500"
            >
              {`${expanded ? "Tutup"  : "Selengkapnya"}`}
            </button>
          )}
          {expanded && (
            <Notification onClose={() => setExpanded(false)}>
              {description}
            </Notification>
          )}
        </div>
      </div>
    </div>
  );
}
