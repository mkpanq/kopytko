import { useEnvs } from "../lib/hooks/useEnvs";
import { Link } from "@tanstack/react-router";

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
            <Link to="/login">Login</Link>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
