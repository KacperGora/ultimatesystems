import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hook";
import { toggleModal } from "../../../../store/modalSlice";
import Modal from "./Modal";
import { CloseSign, DesktopCloseButton, DesktopModalContainer } from "./ModalPopupStyle";

interface BaseModalWrapperProps {
  header?: string;
  message?: string;
  content?: React.ReactNode;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({ content }) => {
  const dispatch = useAppDispatch();
  const modalIsVisible = useAppSelector(
    (state: any) => state.modal.modalIsShow
  );

  if (!modalIsVisible) {
    return null;
  }

  return (
    <Modal>
      <DesktopModalContainer>
        <DesktopCloseButton onClick={() => dispatch(toggleModal())}>
          <CloseSign onClick={() => dispatch(toggleModal())} />
        </DesktopCloseButton>
        {content}
      </DesktopModalContainer>
    </Modal>
  );
};
export default BaseModalWrapper;
