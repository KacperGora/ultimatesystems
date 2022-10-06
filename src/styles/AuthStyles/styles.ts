import styled from "styled-components";
type Props = {
  isInvalid?: boolean;
};
export const StyledWrapper = styled.div`
  display: grid;
  place-content: center;
  margin: 5rem auto;
  min-width: 630px;
  height: 830px;
  max-height: 80vh;

  h2 {
    font-size: 3.7rem;
    text-align: center;
    margin: 4.8rem auto;
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
  padding-left: 60px;
  min-width: 475px;
  min-height: 52px;
  border: ${(props) => (props.isInvalid ? "1px solid red" : "")};
  outline: none;
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

export const StyledButton = styled.button`
  border: 1px solid #24399b;
  cursor: pointer;
  color: #233f81;
  font-size: 28px;
  background-color: white;
  border-radius: 7px;
  opacity: 1;
  min-width: 472px;
  min-height: 68px;
  margin-top: 8rem;
  transition: all 300ms;

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
`;
export const ErrorParagraph = styled.p`
  text-align: left;
  padding-left: 5rem;
  font-size: 1.6rem;
  color: red;
`;
