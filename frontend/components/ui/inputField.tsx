import { InputFieldProps } from '@/types';
const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}: InputFieldProps) => {
  if (type === 'radio') {
    return (
      <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
        <input
          type="radio"
          value={value}
          onChange={onChange}
          className="form-radio text-primary focus:ring-primary"
          {...props}
        />
        <span className="text-sm text-darkText">{label}</span>
      </label>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="text-darkText text-sm block mb-1 font-medium" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 text-darkText focus:outline-primary"
        {...props}
      />
    </div>
  );
};

export default InputField;