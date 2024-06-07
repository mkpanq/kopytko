import { useNavigate, useRouter } from "@tanstack/react-router";

export function useInvalidateRouter(from: string, to: string) {
  const router = useRouter();
  const navigate = useNavigate({ from: from });

  const redirectAndInvalidate = () => {
    router.invalidate();
    navigate({ to: to });
  };

  return redirectAndInvalidate;
}
