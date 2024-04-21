import React, { useState } from "react";

const Dropdown = ({
  title,
  value = "dropdown",
  valueKey = "title",
  menus = [
    { id: 1, title: "option 1" },
    { id: 2, title: "option 2" },
    { id: 3, title: "option 3" },
  ],
  onSet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (item) => {
    onSet(item);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-row gap-3 items-center">
      <h5 className="w-48">{title}</h5>

      <div className="w-full">
        <div className="relative inline-block w-full ">
          <button
            type="button"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full px-2 py-2 hover:bg-gray-00 focus:ring-1  focus:ring-blue-500 focus:border-blue-500 font-medium  inline-flex justify-between items-center"
            onClick={toggleDropdown}
          >
            <h6>{value ? value[valueKey] : "Silahkan untuk dipilih"}</h6>
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="w-full z-50 origin-top-right absolute right-0 mt-2 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <ul
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {menus.map((item, index) => (
                  <li key={index}>
                    <button
                      className="w-full block text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => closeDropdown(item)}
                    >
                      {item[valueKey]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
