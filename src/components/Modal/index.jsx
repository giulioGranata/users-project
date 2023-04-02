import ReactModal from "react-modal";
import "./style.css";
import { Content } from "./Content";

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
      <Content firstOpening={firstOpening} setFirstOpening={setFirstOpening} />
    </ReactModal>
  );
};
