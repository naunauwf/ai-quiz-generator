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
        <label className="block text-brand-dark font-bold mb-2 text-sm transition-all">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="sm:w-96 px-3 py-1 border rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-dark text-brand-dark/70 transition-all placeholder:text-xs sm:placeholder:text-base focus:border-brand-dark outline-1 placeholder:text-brand-dark/30"
          placeholder={placeholder}
          required
        />
      </div>
    </main>
  );
}
