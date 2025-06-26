import React, { forwardRef, useId } from "react";

function Select({ label, options, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select id={id} {...props} ref={ref} className={`w-full  ${className}`}>
        {/* if their is value in Option then go for loop if we dont use '?' on option then i will crash the application */}
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
