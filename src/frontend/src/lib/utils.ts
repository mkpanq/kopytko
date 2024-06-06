import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TCurrentUser } from "../../../backend/shared/schemas/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLoggedIn(currentUser: TCurrentUser): boolean {
  return Boolean(currentUser?.id);
}
