import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "./components/Modal";
import { getUsers } from "./api";
import { useGetUsers } from "./hooks";

const App = () => {
  const [firstOpening, setFirstOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { refetch } = useGetUsers();

  const handleClick = () => {
    firstOpening && (setFirstOpening(false), refetch());
    setIsOpen(true);
  };

  return (
    <div id="app">
      <h1>Users Project</h1>
      <div className="card">
        <button onClick={() => handleClick()}>Open Modal</button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default App;
