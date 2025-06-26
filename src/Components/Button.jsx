import React from "react";
function Button({
  children,
  text = "buttom",
  // bgcolor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-blue-500 ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
