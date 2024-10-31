import { api } from "@/lib/api";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextProps {
  user: any | null;
  setUser: (user: any) => void;
  reloadAuth: () => void;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  const reloadAuth = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  const setUserData = (user: any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    // check user
    reloadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser: setUserData, reloadAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthData = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
