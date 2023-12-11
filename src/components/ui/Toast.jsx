/** @format */

import { Toast as BootstrapToast } from "react-bootstrap";

// Toast component for displaying temporary messages
const Toast = ({ show, message, variant }) => {
  // Render the BootstrapToast component with the specified properties
  return (
    <BootstrapToast
      show={show}
      onClose={() => {}}
      delay={3000} // Duration the toast will be displayed (in milliseconds)
      autohide // Enable automatic hiding after the specified delay
      animation // Enable fade-in and fade-out animation
      bg={variant} // Background color variant for the toast (e.g., 'success', 'warning', 'danger')
      className="position-fixed bottom-1 end-0" // CSS classes for positioning
    >
      {/* Body of the toast with the provided message */}
      <BootstrapToast.Body className="text-white">
        {message}
      </BootstrapToast.Body>
    </BootstrapToast>
  );
};

export default Toast;
