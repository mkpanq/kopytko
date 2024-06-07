import { Link } from "@tanstack/react-router";

export function PublicDashboardButton() {
  return <Link to="/dashboard">Public dashboard</Link>;
}

export function UserDashboardButton() {
  return <Link to="/user-dashboard">User dashboard</Link>;
}
