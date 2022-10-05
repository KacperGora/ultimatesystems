import styled from "styled-components";
type Props = {
  isInvalid?: boolean;
  small?: boolean;
  fw?: boolean;
  search?: boolean;
  edit?: boolean;
  modal?: boolean;
  active?: boolean;
};
export const StyledWrapper = styled.div`
  display: grid;
  place-content: center;
  margin: 7rem auto;
  width: 634px;
  height: 830px;
  max-height: 80vh;

  h2 {
    font-size: 3.7rem;
    text-align: center;
    margin: 0 10rem;
    width: 394px;
    height: 89px;
  }
  .link {
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    color: #999;
    transition: all 300ms;
    &:hover {
      color: black;
      scale: 1.1;
    }
  }
`;
export const StyledForm = styled.form`
  padding: 10px;
  margin: 1.6rem auto;
  display: flex;
  flex-direction: column;
  gap: 45px;
`;
export const StyledInput = styled.input<Props>`
  border: 0.5px solid #c6ceda;
  border-radius: 6px;
  opacity: 1;
  padding: 0.5rem 0;
  width: 474px;
  height: ${(props) => (props.search ? "45px" : "52px")};
  font-size: ${(props) => (props.search ? "16px" : "")};
  text-align: left;
  padding-left: 60px;
  outline: ${(props) => (props.search ? "none" : "")};
  border: ${(props) => (props.isInvalid ? "1px solid red" : "")};

  background-color: ${(props) =>
    props.isInvalid ? "rgba(252, 157, 146, 0.1)" : ""};
`;
export const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const StyledButton = styled.button<Props>`
  border: ${(props) =>
    props.small ? "0.25px solid #676767" : "1px solid #24399b"};
  cursor: pointer;
  color: ${(props) => (props.small ? "black" : "#233f81;")};
  font-size: ${(props) => (props.small ? "14px" : "28px;")};
  font-size: ${(props) => (props.search ? "18px" : ";")};
  font-weight: ${(props) => (props.fw ? "600" : "")};
  background-color: white;
  border-radius: ${(props) => (props.small ? "12px" : "7px")};
  opacity: 1;
  padding: ${(props) => (props.small ? "6px 0px" : "")};
  padding: ${(props) => (props.edit ? "6px 32px" : "")};
  min-width: ${(props) => (props.small ? "152px" : "472px")};
  min-height: ${(props) => (props.small ? "42px" : "68px")};
  margin-top: ${(props) => (props.small ? "0" : " 8rem;")};
  position: ${(props) => (props.search ? "absolute" : "")};
  left: ${(props) => (props.search ? "400px" : "")};
  min-height: ${(props) => (props.search ? "45px" : "")};
  transition: all 300ms;
  border: ${(props) => (props.search ? "1px solid #24399B" : "")};

  :hover {
    color: white;
    background-color: #24399b;
  }
  :disabled {
    color: rgba(200, 200, 200, 0.9);
    background-color: rgba(175, 175, 175, 0.2);
    cursor: not-allowed;
  }
`;
export const InputWithIcon = styled.div`
  position: relative;
  .icon {
    position: absolute;

    color: #989898;
    padding: 10px;
  }
  .searchBtn {
    position: absolute;
  }
`;
export const ErrorParagraph = styled.p<Props>`
  text-align: left;

  padding-left: ${(props) => (props.modal ? "" : "6rem")};
  font-size: 1.6rem;
  color: red;
`;
