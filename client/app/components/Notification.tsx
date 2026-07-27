export default function Notification({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <main>
      <div className="transition-all fixed flex justify-center items-center inset-0 bg-black/50 z-50">
        <div className=" bg-white font-semibold text-gray-600 px-5 rounded-lg w-80 text-cente max-w-full p-5">
          <p className="mb-4">{children}</p>
          <button
            onClick={onClose}
            className="bg-green-300 hover:bg-green-400 font-semibold text-gray-600 rounded-lg px-3 border-none outline-gray-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </main>
  );
}
