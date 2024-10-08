import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@src/contexts/auth/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";

export const ProgressCircleBox = styled(Box)({
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        clearInterval(checkTokenExpiration);
        return;
      }

      const jwtExp = JSON.parse(atob(token.split(".")[1])).exp;
      const expiryDate = new Date(jwtExp * 1000);

      if (expiryDate < new Date()) {
        logout();
      }
    }, 60000);

    return () => clearInterval(checkTokenExpiration);
  }, [logout]);

  if (loading || !isAuthenticated) {
    return (
      <ProgressCircleBox>
        <CircularProgress />
      </ProgressCircleBox>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
