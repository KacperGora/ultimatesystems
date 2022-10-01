import styled from "styled-components";

export const ModalContainer = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.25);
  padding: 40px;
  width: 800px;
  font-size: 25px;
`;
export const Header = styled.p`
  color: black;
  font-size: 12px;
  margin: 5px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

export const Message = styled.p`
  color: #555;
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 36px;
`;
export const CloseSign = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: gray;

  &::before,
  &::after {
    position: absolute;
    left: 14px;
    top: 6px;
    content: "";
    height: 15px;
    width: 2px;
    background-color: gray;
  }
  &::before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const CLOSE_BUTTON_SIZE = 30;
export const CloseButton = styled.div`
  position: absolute;
  width: ${CLOSE_BUTTON_SIZE}px;
  height: ${CLOSE_BUTTON_SIZE}px;
  background-color: white;
  border: 1px solid #555;
  border-radius: 50%;
  cursor: pointer;

  & > * {
    opacity: 1;
  }
  &:hover > * {
    opacity: 0.4;
  }
`;
export const DesktopCloseButton = styled(CloseButton)`
  top: -${CLOSE_BUTTON_SIZE / 2}px;
  left: calc(100% - ${CLOSE_BUTTON_SIZE / 2}px);
`;
