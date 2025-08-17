import "./modalStyles.css";

import { ReactNode } from "react";

interface RespondModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function RespondModal({ children, isOpen, handleClose }: RespondModalProps) {
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
