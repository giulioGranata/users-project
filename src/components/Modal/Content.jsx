import "./style.css";
import { ToggleBar } from "../ToggleBar";
import { useEffect, useState } from "react";
import { User } from "../User";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api";

export const Content = ({ firstOpening, setFirstOpening }) => {
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

  return <div className="modal-content">{render()}</div>;
};
