import React, { useEffect, useState } from "react";
import "./css/ErrorModal.css"; // Create a CSS file for error modal styles

const ErrorModal = ({ isOpen, onClose, children }) => {
  const [isActive, setIsActive] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setIsActive(isOpen);
    // Set animation class based on modal state
    setAnimationClass(isOpen ? "popup" : "popclose");
  }, [isOpen]);

  const handleClose = () => {
    // Set animation class to popclose when closing modal
    setAnimationClass("popclose");
    // Wait for animation to complete before closing modal
    setTimeout(() => {
      onClose();
    }, 200); // Adjust timeout to match the duration of the popclose animation
  };

  return (
    <div>
      {isActive && (
        <div className={`error-modal-overlay fade-in`} onClick={handleClose}>
          <div
            className={`error-modal-content ${animationClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorModal;
