import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isAdminLogState } from "../recoil/atoms";
import { adminvalidateToken } from "../utils/tokenvalidation";

function adminAuth(isPublicRoute) {
  const navigate = useNavigate();
  const [adminLogged, setAdminlogged] = useRecoilState(isAdminLogState);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isValid = await adminvalidateToken();
        // console.log(isValid);
        if (isPublicRoute && isValid) {
          setAdminlogged(true);
          navigate("/admin-dashboard");
        } else if (!isPublicRoute) {
          if (isValid) {
            setAdminlogged(true);
            navigate("/admin-dashboard");
          } else if (!isValid) {
            setAdminlogged(false);
            navigate("/adminlogin");
          }
        }
      } catch (error) {
        console.error("Error validating token:", error);
        if (!isPublicRoute) {
          setAdminlogged(false);
          navigate("/adminlogin");
        }
      }
    };

    checkAuthentication();
  }, [isPublicRoute, navigate, setAdminlogged]);

  // Return a value if needed
  return adminLogged;
}

export default adminAuth;
