/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Dropdown = (props) => {
  const { options, selected, placeholder, onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-[9]" ref={dropdownRef}>
      <button
        type="button"
        className="w-full bg-transparent border border-[#02174C33] hover:border-secondary rounded pl-3 pr-10 py-[6px] text-left cursor-pointer focus:outline-none  focus:border-secondary sm:text-sm"
        onClick={handleToggle}
      >
        <span className="text-[#333] md:text-[18px] text-[14px] font-[500]">
          {selected?.name ? selected?.name : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <MdKeyboardArrowDown className="text-[#718096] text-[22px]" />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-[#02174C33] shadow-lg max-h-56 rounded py-1 text-base overflow-auto sm:text-sm">
          {options?.map((option, index) => (
            <li
              key={index}
              className={`select-none relative text-[15px] font-[500] py-2 pl-3 pr-9 text-[#333] ${
                option?.name === selected?.name
                  ? "text-secondary font-bold"
                  : "hover:bg-secondary hover:text-white cursor-pointer"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option?.name}
              {option?.name === selected?.name && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#333]">
                  <TiTick className="text-[18px]" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
