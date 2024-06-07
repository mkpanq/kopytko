import { Link } from "@tanstack/react-router";
import { LoginButton } from "./loginButton";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";

export function Navbar() {
  const { currentUser } = useCurrentUser();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          Kopytko
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <span>CurrentUser - {currentUser?.id || `{}`}</span>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
      </div>
    </div>
  );
}
