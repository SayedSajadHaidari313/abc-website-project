import { logout } from "@/auth/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        navigate("/");
      }
    };

    doLogout();
  }, [navigate]);

  return <div>Logout....</div>;
};

export default Logout;
