/* eslint-disable react/prop-types */
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";

function Input(props) {
  const {
    icon,
    name,
    placeholder,
    type,
    value,
    handleChange,
    field,
    password,
    setPassword,
  } = props;

  return (
    <div className="relative">
      {icon && (
        <div className="w-auto h-full flex justify-center items-center absolute top-0 left-2 text-[18px] text-center text-[#6F7487]">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className="w-full h-[40px] ps-[30px] pe-[30px] rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
      />
      {field === "password" && (
        <div
          className="w-auto h-full absolute top-0 right-2 cursor-pointer flex items-center justify-center text-[18px] text-center"
          onClick={() => setPassword(!password)}
        >
          {password ? <PiEyeSlash /> : <PiEyeLight />}
        </div>
      )}
    </div>
  );
}

export default Input;
