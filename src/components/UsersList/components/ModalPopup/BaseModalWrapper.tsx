import React from "react";

import Modal from "./Modal";
import {
  CloseSign,
  DesktopCloseButton,
  DesktopModalContainer,
  Header,
} from "./ModalPopup";
interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header?: string;
  message?: string;
  content?: React.ReactNode;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({
  onBackdropClick,
  isModalVisible,
  header,

  content,
}) => {
  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal onBackdropClick={onBackdropClick}>
      <DesktopModalContainer>
        <DesktopCloseButton onClick={onBackdropClick}>
          <CloseSign onClick={onBackdropClick} />
        </DesktopCloseButton>
        <Header>{header}</Header>

        {content}
      </DesktopModalContainer>
    </Modal>
  );
};
export default BaseModalWrapper;
