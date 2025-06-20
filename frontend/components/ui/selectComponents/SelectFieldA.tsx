
const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  className = '',
  ...props
}: any) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={label} className="text-darkText text-sm block mb-1 font-medium">
          {label}
        </label>
      )}
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-200 rounded-md mt-1 text-darkText focus:outline-primary"
        {...props}
      >
        <option value="">Select {label?.toLowerCase()}</option>
        {options?.map((opt :any ,index) => (
          <option key={index} value={opt.name}>
            { opt?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
