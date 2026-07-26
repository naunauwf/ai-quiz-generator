import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <nav>
        <ul className="flex justify-center items-center gap-2.5 text-amber-300 font-bold">
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link href={""}>About Us</Link>
          </li>
          <li>
            <Link href={""}>Contact</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1 className="text-3xl font-bold text-white text-center">Home</h1>
      </div>
    </main>
  );
}

// {(!files || files.length === 0) && (
//   <p className="p-5 text-center text-red-500 font-bold">
//     Tidak ada data gambar ditemukan pada tabel &apos;image_url&apos;
//   </p>
// )}
// <div className="flex gap-2.5 flex-wrap justify-center items-center p-5">
//   {files?.map((file) => (
//     // ambil public url untuk tiap file
//     <Image
//       key={file.id}
//       src={file.image_url}
//       alt="image"
//       className="object-cover w-50 h-50"
//       loading="eager"
//       width={200}
//       height={200}
//       unoptimized
//     />
//   ))}
// </div>
