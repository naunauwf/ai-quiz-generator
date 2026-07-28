import { getData } from "../utils/get.data";
import Card from "../components/Card";
import Form from "../components/Form";

export default async function Dashboard() {
  const files = await getData();

  return (
    <div className="p-0.5 sm:p-5 m-24 bg-brand-secondary h-auto w-[95%] sm:w-[85%] mx-auto rounded-4xl">
      <h1 className="text-center font-bold text-2xl sm:text-3xl text-white ">
        List of Images
      </h1>
      {/* Form Input */}
      <div>
        <Form />
      </div>
      {/* show messages if the data is null */}
      {(!files || files.length === 0) && (
        <p className="p-5 text-center text-red-500 font-bold">
          Tidak ada data gambar ditemukan pada tabel &apos;image_url&apos;
        </p>
      )}
      <div className="flex justify-center items-center flex-wrap p-5 gap-5 sm:gap-3.5">
        {files?.map((file) => (
          <Card
            key={file.id}
            title={file.title}
            description={file.description}
            src={file.image_url}
          />
        ))}
      </div>
    </div>
  );
}
