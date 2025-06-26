import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
function Protected({ children, authentication = true }) {
  const [loder, setLoder] = useState(true);
  const navigate = useNavigate();
  const { isUser } = useSelector((state) => state?.auth);
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (authentication && (isUser || isAuthenticated) !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoder(false);
  }, [authStatus, navigate, authentication, isAuthenticated]);
  return loder ? <>...loading </> : <>{children}</>;
}
export default Protected;
