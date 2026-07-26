type InputFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  value,
  placeholder,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <main>
      <div className="mb-4 sm:flex sm:flex-col sm:items-start">
        <label className="block text-green-300 font-bold mb-2 text-sm transition-all">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="sm:w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-taupe-50 transition-all"
          placeholder={placeholder}
          required
        />
      </div>
    </main>
  );
}
