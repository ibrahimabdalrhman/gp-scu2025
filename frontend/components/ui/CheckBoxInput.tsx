interface ICheckBoxInputProps {
  className?: string;
  id: number | string;
  name: string;
  label: string;
  hidden?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  value?: string;
}
const CheckBoxInput = ({
  className = '',
  id,
  name,
  label,
  hidden = false,
  onChange,
  checked,
  value,
}: ICheckBoxInputProps) => {
  return (
    <>
      <input 
        type="checkbox" 
        id={id} 
        name={name}
        className={`h-4 w-4 rounded border-gray-300 text-primary ${className}`} 
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <label 
        htmlFor={id} 
        className={`text-sm text-gray-600 cursor-pointer ${hidden ? 'hidden' : ''}`}
      >
        {`${label} ${name === "starRating" ? "star" : ""}`}
      </label>
    </>
  );
};

export default CheckBoxInput;