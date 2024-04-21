import React from "react";

const Input = ({
  title = "title",
  value,
  placeholder = "Input disini",
  disabled = false,
  onChange,

  type = "text",
}) => {
  return (
    <div className="w-full flex flex-row gap-3 items-center">
      <h5 className="w-48">{title}</h5>
      <input
        type={type}
        value={value}
        placeholder={!disabled ? placeholder : ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`${
          disabled ? "bg-gray-200" : "bg-gray-50 hover:bg-gray-100"
        }  border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      />
    </div>
  );
};

export default Input;
