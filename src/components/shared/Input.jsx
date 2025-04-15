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
    <div className="relative h-[40px]">
      {icon && (
        <div className="w-auto h-full flex justify-center items-center absolute top-0 left-2 text-[18px] text-center text-[#6F7487]">
          {icon}
        </div>
      )}
      <input
        type={type}
        // placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        id={name}
        className="peer w-full h-full ps-[30px] pe-[30px] rounded-[4px] bg-transparent border border-[#02174C33] outline-none hover:border-secondary focus:border-secondary"
      />
      <label
        htmlFor={name}
        className="absolute top-1/2 translate-y-[-50%] bg-white left-[25px] px-2 peer-focus:top-0 peer-focus:left-[22px] font-light text-base text-[12px] text-[#6F7487] peer-focus:text-[12px] peer-focus:text-secondary duration-150"
      >
        {placeholder}
      </label>
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
