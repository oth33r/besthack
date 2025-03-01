import { useAuth } from "@shared/contexts/hooks/useAuth";
import { PropsWithChildren, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../Loader/Loader";

interface ProtectedRouteProps extends PropsWithChildren {
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  redirectPath = "/authorization",
}: ProtectedRouteProps) => {
  const { isAuthenticated, validate, isLoading } = useAuth();

  useEffect(() => {
    validate();
  }, []);

  if (isLoading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export { ProtectedRoute };
