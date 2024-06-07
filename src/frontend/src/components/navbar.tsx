import { Link } from "@tanstack/react-router";
import { LoginButton } from "./loginButton";
import { useCurrentUser } from "../lib/hooks/useCurrentUser";
import { useEffect } from "react";

export function Navbar({
  currentUser,
}: {
  currentUser: ReturnType<typeof useCurrentUser>;
}) {
  console.log(`Render: ${currentUser.currentUser.id}`);

  useEffect(() => {
    currentUser.fetchCurrentUser();
  }, []);

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
            <span>CurrentUser - {currentUser.currentUser.id || `{}`}</span>
          </li>
          <li>
            <LoginButton currentUser={currentUser.currentUser} />
          </li>
        </ul>
      </div>
    </div>
  );
}
