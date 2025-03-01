import { Loader } from "@shared/components";
import { useValidateUser } from "@shared/services/queries";
import { AuthContextType } from "@shared/types/types";
import { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { data, isLoading } = useValidateUser();

  if (isLoading) return <Loader />;

  const validate = () => {
    if (data?.status === 200) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, validate, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
