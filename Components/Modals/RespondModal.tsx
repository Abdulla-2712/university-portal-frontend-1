import "./modalStyles.css";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface RespondModalProps {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function RespondModal({ children, isOpen, handleClose }: RespondModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn">
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
