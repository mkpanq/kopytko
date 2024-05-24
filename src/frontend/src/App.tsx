import { useEffect, useState } from "react";
import { frontendApiClient } from "../../backend/frontendApiClient";

function App() {
  const [rpcData, setRpcData] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await frontendApiClient.api.$get();
      const data = await res.text();
      setRpcData(data);
    };
    getData();
  }, []);

  return (
    <>
      <div>Hello World from {rpcData}</div>
    </>
  );
}

export default App;
