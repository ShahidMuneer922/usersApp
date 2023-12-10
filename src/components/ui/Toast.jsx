import { Toast as BootstrapToast } from "react-bootstrap"

const Toast = ({ show, message, variant }) => {
    return (
      <BootstrapToast
      show={show}
      onClose={() => {}}
      delay={3000}
      autohide
      animation
      bg={variant}
      className="position-fixed bottom-1 end-0"
    >
      <BootstrapToast.Body className="text-white" >{message}</BootstrapToast.Body>
    </BootstrapToast>
  );
};
export default Toast;
