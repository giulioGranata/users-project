import ReactModal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import "./style.css";
import { getUsers } from "../../api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};

export const Modal = ({ isOpen, setIsOpen, data, isLoading, isError }) => {
  const renderContent = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    // We can assume by this point that `isSuccess === true`
    return (
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      appElement={document.getElementById("app")}
    >
      <h2>Hello</h2>
      <button onClick={() => setIsOpen(false)}>close</button>
      {renderContent()}
    </ReactModal>
  );
};
