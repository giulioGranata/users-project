import "./style.css";

export const User = ({ selectedUser }) => {
  const { first_name, last_name, avatar, email } = selectedUser || {};

  return (
    <div className="user-container">
      {selectedUser ? (
        <div className="user-details">
          <img src={avatar} />
          <div className="user-details-info">
            <div>
              <i>fullname: </i>
              <b>
                {first_name} {last_name}
              </b>
            </div>
            <div>
              <i>email: </i> <b>{email}</b>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        <i>No user selected</i>
      )}
    </div>
  );
};
