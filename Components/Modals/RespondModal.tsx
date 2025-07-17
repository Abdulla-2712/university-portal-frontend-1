import "./modalStyles.css";

export default function RespondModal({ children, isOpen, handleClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={handleClose} className="close-btn">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
