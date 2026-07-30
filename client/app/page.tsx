import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <nav className="m-5 bg-brand-white mx-auto w-1/2 h-auto rounded-lg">
        <ul className="flex justify-center items-center gap-2.5  text-brand-dark font-bold">
          <li className="hover:text-gray-500 transition-all">
            <Link href={"/gallery"}>Gallery</Link>
          </li>
          <li className="hover:text-gray-500">
            <Link href={""}>About Us</Link>
          </li>
          <li className="hover:text-gray-500">
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