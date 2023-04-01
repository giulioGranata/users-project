import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "./components/Modal";
import { getUsers } from "./api";

const App = () => {
  const [firstOpening, setFirstOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(10),
    enabled: false,
  });

  const handleClick = () => {
    firstOpening && (setFirstOpening(false), refetch());
    setIsOpen(true);
  };

  return (
    <div id="app">
      <h1>Users Project</h1>
      <div className="card">
        <button onClick={() => handleClick()}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          isError={isError}
          isLoading={isLoading}
          refetchData={refetch}
        />
      </div>
    </div>
  );
};

export default App;
