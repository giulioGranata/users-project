import { useGetUsers } from "../../hooks";
import "./style.css";

export const ToggleBar = ({ selectedUser, setSelectedUser }) => {
  const { data } = useGetUsers();

  return (
    <div className="toggle-bar">
      {data.map((user, i) => (
        <button
          key={i}
          className={`button-user${
            selectedUser?.id === user.id ? "-selected" : ""
          }`}
          onClick={() =>
            setSelectedUser(selectedUser?.id === user.id ? null : user)
          }
        >
          {user.first_name} {user.last_name}
        </button>
      ))}
    </div>
  );
};
