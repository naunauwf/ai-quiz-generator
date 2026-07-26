import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  src: string;
};

export default function Card({ title, description, src }: CardProps) {
  return (
    <main>
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
          <p className="text-gray-600 text-sm">
            {description || "No description provided."}
          </p>
        </div>
      </div>
    </main>
  );
}
