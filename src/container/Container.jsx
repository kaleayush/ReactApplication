import React from "react";
function Container({ children }) {
  return <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10  max-h-screen  relative">{children}</div>;
}

export default Container;
