import { Link } from "@tanstack/react-router";
import { DashboardButton } from "./buttons/dashboard";
import { LoginButton } from "./buttons/login";
import { useCurrentUser } from "../../lib/hooks/useCurrentUser";
import { LogoutButton } from "./buttons/logout";

export function Navbar() {
  const { isAuthenticated } = useCurrentUser();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          Kopytko
        </Link>
      </div>
      <NavbarMenuList isAuthenticated={isAuthenticated} />
    </div>
  );
}

function NavbarMenuList({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li>
          <DashboardButton auth={isAuthenticated} />
        </li>
        <li>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</li>
      </ul>
    </div>
  );
}
