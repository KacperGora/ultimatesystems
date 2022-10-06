import React from "react";
import { useAppDispatch } from "../../store/hook";
import { toggleModal } from "../../store/modalSlice";
import {
  ModalContainer,
  SuccessButton,
} from "../../styles/AuthStyles/ModalStyles/ModalPopupStyle";

const SuccessModal: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <ModalContainer>
        <h3>Pomyślnie zapisano dane</h3>
        <SuccessButton onClick={() => dispatch(toggleModal())} success>
          Powrót do strony głównej
        </SuccessButton>
      </ModalContainer>
    </>
  );
};

export default SuccessModal;
