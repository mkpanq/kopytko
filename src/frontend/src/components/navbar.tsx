import { useEnvs } from "../lib/hooks/useEnvs";
import { Link } from "@tanstack/react-router";
import SessionButtonComponent from "./sessionButton";

export function Navbar() {
  const envs = useEnvs();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          {envs.VITE_APPLICATION_NAME}
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/issues">Issues</Link>
          </li>
          <li>
            <SessionButtonComponent />
          </li>
        </ul>
      </div>
    </div>
  );
}
