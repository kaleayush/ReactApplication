import React from "react";

function Logo({ width = "100px", height = "100px" }) {
  return (
    <div>
      <img
        src="https://prakashinfotech.com/wp-content/uploads/2023/08/prakash-color-logo.png"
        alt="image not found"
        width={width}
        height={height}
      />
    </div>
  );
}

export default Logo;
