import React from "react";
import { ModalButton, ModalContainer, SuccessButton } from "./ModalPopup";
interface EditInfoModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}
const SuccessModal: React.FC<EditInfoModalProps> = ({
  onBackdropClick,
  isModalVisible,
}) => {
  return (
    <>
      <ModalContainer>
        <h3>Pomyślnie zapisano dane</h3>
        <SuccessButton onClick={onBackdropClick} success>
          Powrót do strony głównej
        </SuccessButton>
      </ModalContainer>
    </>
  );
};

export default SuccessModal;
