import { JSX, useEffect } from "react";
import { useNavigate } from "react-router";

export const RedirectAuthorized = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/services", { replace: true });
    }
  }, [token, navigate]);

  return !token ? children : null;
};
