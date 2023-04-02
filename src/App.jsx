import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";

const App = () => {
  const [firstOpening, setFirstOpening] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div id="app">
      <h1>Users Project</h1>
      <div className="card">
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          firstOpening={firstOpening}
          setFirstOpening={setFirstOpening}
        />
      </div>
    </div>
  );
};

export default App;
