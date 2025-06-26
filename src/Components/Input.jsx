import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="block mb-1">
      {label && (
        <label className="block mb-1 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`${className}px-3 py-2  border rounded-md p-2 w-full`}
        type={type}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
