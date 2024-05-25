import { useEffect, useState } from "react";
import { useApiClient } from "./lib/hooks/useApiClient";

function App() {
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

export default App;
