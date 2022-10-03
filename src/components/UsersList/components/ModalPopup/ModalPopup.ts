import styled from "styled-components";
type Props = {
  tel?: boolean;
  checkbox?: boolean;
  cancel?: boolean;
  success?: boolean;
};
export const ModalContainer = styled.div`
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  h3 {
    font-size: 36px;
    color: #4eb100;
    margin: 24px auto 48px;
  }
`;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.25);
  padding: 40px;
  width: 1200px;
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
////MODAL FORM ////

export const StyledModalForm = styled.form``;

// export const StyledFormGridContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);

//   gap: 50px;
// `;

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 1125px;
  gap: 50px;

  input {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
  }
`;
export const StyledInputContainer = styled.div<Props>`
  display: flex;

  flex-direction: ${(props) => (props.checkbox ? "row" : "column")};
  align-items: ${(props) => (props.checkbox ? "center" : "")};
  gap: 12px;
  label {
    font-size: 16px;
  }
`;

export const InputTelBox = styled.div`
  display: flex;
  gap: 12px;

`;
export const InputTel = styled.input`
  width: 35px;
`;

export const Label = styled.label`
  font-size: 16px;
`;

export const CheckBoxInput = styled.input``;
export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 48px auto 16px auto;
  p {
    font-size: 16px;
  }
`;
export const ModalButton = styled.button<Props>`
  border: 0.25px solid #676767;
  cursor: pointer;
  color: ${(props) => (props.cancel ? "#3E69C4" : "black")};

  font-size: 14px;
  background-color: white;
  border-radius: 12px;
  opacity: 1;
  padding: 12px 64px;
  border: ${(props) => (props.cancel ? "none" : "0.25px solid #676767;")};
  transition: all 200ms;

  :hover {
    color: ${(props) => (props.cancel ? "#3E69C4" : "white")};
    background-color: ${(props) => (props.cancel ? "none" : "#24399b")};
  }
  :disabled {
    color: rgba(200, 200, 200, 0.9);
    background-color: rgba(175, 175, 175, 0.2);
    cursor: not-allowed;
  }
`;
export const SuccessButton = styled(ModalButton)`
  border: 1px solid #7ac943;
  font-weight: 600;
  transition: all 300ms;
  :hover {
    background-color: #4EB100;
  }
`;
