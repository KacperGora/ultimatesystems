import React from "react";
import ReactDOM from "react-dom";
import { useAppDispatch } from "../../store/hook";
import { toggleModal } from "../../store/modalSlice";
import { Overlay } from "../../styles/AuthStyles/ModalStyles/ModalPopupStyle";


interface ModalProps {
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  return ReactDOM.createPortal(
    <Overlay onClick={() => dispatch(toggleModal())}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </Overlay>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
