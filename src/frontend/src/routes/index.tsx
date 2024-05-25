import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApiClient } from "../lib/hooks/useApiClient";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const apiClient = useApiClient();

  useEffect(() => {
    const getData = async () => {
      const res = await apiClient.api.$get();
      const text = await res.text();
      setWelcomeMsg(text);
    };

    getData();
  });

  return <div className="text-3xl font-thin">Hello World - {welcomeMsg}</div>;
}
