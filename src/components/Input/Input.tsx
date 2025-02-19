interface InputProps {
  label: string;
  type: string;
//   value: string; !!!!!!
  name: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
//   value,
  placeholder,
}) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} name={name} placeholder={placeholder} />
    </>
  );
};

export default Input;
