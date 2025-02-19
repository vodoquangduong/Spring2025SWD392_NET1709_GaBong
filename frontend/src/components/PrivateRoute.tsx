import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { isTokenExpired } from "../modules/jwtUtil";

export default function PrivateRoute({
  children,
  redirectUrl,
  allowedRoles,
}: {
  children: any;
  redirectUrl: string;
  allowedRoles: string[];
}) {
  const auth = useAuthStore((state) => state);

  // Check if the user is authenticated and has allowed role to access the route
  return auth?.isAuthenticated &&
    !isTokenExpired() &&
    allowedRoles.includes(auth.role) ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectUrl} />
  );
}
