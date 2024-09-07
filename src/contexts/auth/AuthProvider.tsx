import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithToken } from "@src/utils/fetchWithToken";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (tokens: Tokens) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  let validatingToken = false;

  const login = ({ accessToken, refreshToken }: Tokens): void => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("tokenExpiry", calculateTokenExpiry(accessToken));
    setIsAuthenticated(true);
  };

  const logout = (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("userSecret");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const shouldBypassAuth = (path: string): boolean => {
    const noAuthNeededPaths = [
      "/forgot-password",
      "/unsubscribe",
      "/forgot-password/confirm",
      "/set-password",
      "/password-changed",
      "/event-information/",
      "/event-registration",
      "/password-create",
    ];
    return noAuthNeededPaths.some((noAuthPath) => path.startsWith(noAuthPath));
  };

  const validateToken = async () => {
    if (validatingToken) return;
    validatingToken = true;
    try {
      const response = await fetchWithToken(
        import.meta.env.VITE_KRIKEM_BACKEND_URL + "/auth/validate",
        {},
        true,
      );

      if (response.isValid) {
        setIsAuthenticated(true);
      } else {
        console.warn("Token validation failed.");
        // Do not logout immediately, attempt token refresh on next fetchWithToken
      }
    } catch (error) {
      //console.error('Error during token validation', error);
      // Do not logout immediately, attempt token refresh on next fetchWithToken
    } finally {
      setLoading(false);
      validatingToken = false;
    }
  };

  useEffect(() => {
    if (shouldBypassAuth(window.location.pathname)) {
      setLoading(false);
      return;
    }
    validateToken();
  }, [navigate]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !shouldBypassAuth(window.location.pathname)) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function calculateTokenExpiry(accessToken: string): string {
  const { exp } = JSON.parse(atob(accessToken.split(".")[1]));
  return new Date(exp * 1000).toISOString();
}
