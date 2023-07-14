import { FC } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  access: boolean;
  path: string;
  element: JSX.Element;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  access,
  path,
  element,
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (access && !isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (!access && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};
