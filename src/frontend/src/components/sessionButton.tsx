import { Link } from "@tanstack/react-router";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";
import { useEffect } from "react";
import { isLoggedIn } from "../lib/utils";

function SessionButtonComponent() {
  const { currentUser, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return isLoggedIn(currentUser) ? LogoutButton() : LoginButton();
}

export default SessionButtonComponent;

function LoginButton() {
  return <Link to="/login">Login</Link>;
}

function LogoutButton() {
  return <Link to="/logout">Logout</Link>;
}
