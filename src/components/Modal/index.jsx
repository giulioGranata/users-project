import ReactModal from "react-modal";
import "./style.css";
import { ToggleBar } from "../ToggleBar";
import { useEffect, useState } from "react";
import { User } from "../User";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api";

const customStyles = {
  content: {
    backgroundColor: "#CDCDCD",
    bottom: "auto",
    display: "flex",
    flexDirection: "column",
    left: "50%",
    marginRight: "-50%",
    maxWidth: "800px",
    minWidth: "300px",
    overflow: "visibile",
    right: "auto",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px 30px",
  },
  overlay: {
    backgroundColor: "transparent",
  },
};

export const Modal = ({ isOpen, setIsOpen, firstOpening, setFirstOpening }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersToGet, setUsersToGet] = useState(20);
  const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(usersToGet),
    enabled: false,
  });

  useEffect(() => {
    if (firstOpening) {
      setFirstOpening(false);
      refetch();
    }
  }, []);

  const handleClick = () => {
    if (usersToGet && usersToGet > 20)
      return alert("ERROR: You cannot request more than 20 user.");
    refetch(), setSelectedUser(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    return (
      <>
        <ToggleBar
          apiData={data}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <User selectedUser={selectedUser} />

        <div className="refetch">
          <i>Users to get:</i>
          <input
            onChange={(e) => setUsersToGet(e.target.value)}
            type="number"
            value={usersToGet}
          />
          <button onClick={() => handleClick()}>Get Other Users</button>
        </div>
      </>
    );
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={customStyles}
      appElement={document.getElementById("app")}
    >
      <div className="modal-header">
        <h2>Users</h2>
        <button className="close-button" onClick={() => setIsOpen(false)}>
          &times;
        </button>
      </div>
      <div className="modal-content">{renderContent()}</div>
    </ReactModal>
  );
};
