import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
  let navigate = useNavigate();
  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectRoute;
