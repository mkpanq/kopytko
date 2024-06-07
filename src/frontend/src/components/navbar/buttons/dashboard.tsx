import { Link } from "@tanstack/react-router";

export function DashboardButton({ auth = false }: { auth?: boolean }) {
  return <Link to="/dashboard">{auth ? "User" : "Public"} dashboard</Link>;
}
