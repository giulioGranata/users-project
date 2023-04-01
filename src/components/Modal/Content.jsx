import "./style.css";
import { useGetUsers } from "../../hooks";
import { ToggleBar } from "../ToggleBar";
import { useRef, useState } from "react";
import { User } from "../User";

export const Content = () => {
  const { isLoading, isError, error, refetch } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const inputRef = useRef(10);

  const handleClick = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue && inputValue > 20)
      return alert("ERROR: You cannot request more than 20 user.");
    refetch(inputValue), setSelectedUser(null);
  };

  const render = () => {
    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (isError) {
      return <span>Error: {error.message}</span>;
    }

    return (
      <>
        <ToggleBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <User selectedUser={selectedUser} />

        <div className="refetch">
          <i>Users to get:</i>
          <input ref={inputRef} type="number" />
          <button onClick={() => handleClick()}>Get Other Users</button>
        </div>
      </>
    );
  };

  return <div className="modal-content">{render()}</div>;
};
