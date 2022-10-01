import React, { useState, useRef } from "react";
import { StyledButton } from "../../../styles/styles";
import {
  CheckBoxInput,
  InputTel,
  InputTelBox,
  Label,
  StyledForm,
  StyledInputContainer,
} from "./ModalPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface EditInfoModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isModalVisible,
  onBackdropClick,
}) => {
  const [startDate, setStartDate] = useState<Date | null>();

  return (
    <>
      <p
        style={{
          display: "flex",
          alignSelf: "flex-start",
          fontSize: "16px",
          marginBottom: "24px",
          borderBottom: "1px solid #ccc",
          width: "100%",
          paddingBottom: "12px",
        }}
      >
        Edycja danych
      </p>
      <StyledForm>
        <StyledInputContainer>
          <label htmlFor="mail">*E-mail</label>
          <input id="mail" />
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="name">*Imię</label>
          <input id="name" />
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="surname">*Nazwisko</label>
          <input id="surname"></input>
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="birthdate">*data urodzenia</label>
          <DatePicker
            selected={startDate}
            dateFormat="dd-MM-yy"
            onChange={(date: Date | null) => setStartDate(date)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <label htmlFor="tel">*Telefon (previx, 9 cyfr)</label>
          <InputTelBox>
            <InputTel defaultValue="+48" />
            <input type="tel" id="tel"></input>
          </InputTelBox>
        </StyledInputContainer>
        <StyledInputContainer />
        <StyledInputContainer checkbox>
          <CheckBoxInput type="checkbox"></CheckBoxInput>
          <Label>*Polityka prywatności</Label>
        </StyledInputContainer>
        <StyledInputContainer checkbox>
          <CheckBoxInput type="checkbox"></CheckBoxInput>
          <Label>Zgody marketingowe</Label>
        </StyledInputContainer>
        <StyledInputContainer checkbox>
          <CheckBoxInput type="checkbox" />
          <Label>*Regulamin sprzedaży</Label>
        </StyledInputContainer>
      </StyledForm>
    </>
  );
};
export default EditInfoModal;
