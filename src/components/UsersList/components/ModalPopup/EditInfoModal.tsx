import React, { useState } from "react";

import {
  CheckBoxInput,
  InputTel,
  InputTelBox,
  Label,
  ModalButton,
  StyledDiv,
  StyledForm,
  StyledInputContainer,
} from "./ModalPopup";
import SuccessModal from "./SuccessModal";
import useValidation from "../../../../hooks/useValidation";
import validateEmail from "../../../../hooks/validateMail";
import { ErrorParagraph } from "../../../styles/styles";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl"; // the locale you want
import styled from "styled-components";
import Checkbox from "./Checkbox";
registerLocale("pl", pl); // register it with the name you want

interface EditInfoModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isModalVisible,
  onBackdropClick,
}) => {
  const [startDate, setStartDate] = useState<Date | null>();
  console.log(startDate);
  //custom hook for email validation
  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
    reset: resetMailInput,
    isTouched: mailIsTouched,
  } = useValidation(
    (value: string) => value.trim() !== "" && validateEmail(value)
  );

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    isTouched: nameIsTouched,
  } = useValidation((value: string) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
    isTouched: lastNameIsTouched,
  } = useValidation((value: string) => value.trim() !== "");

  // const {
  //   value: entereBirthdateName,
  //   isValid: entereBirthdateNameIsValid,
  //   hasError: birthDateInputHasError,
  //   valueChangeHandler: birthdateChangeHandler,
  //   inputBlurHandler: birthdateBlurHandler,
  //   reset: resetBirthdateInput,
  //   isTouched: birthdateIsTouched,
  // } = useValidation((value: string) => value.trim() !== "");

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: enteredPhoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
    isTouched: phoneNumberIsTouched,
  } = useValidation((value: string) => value.length === 9);
  console.log(enteredPhoneNumberIsValid);
  const data = {
    mail: enteredMail,
    name: enteredName,
    lastName: enteredLastName,
    birthDate: startDate,
    phoneNumber: enteredPhoneNumber,
  };
  console.log(data);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <SuccessModal
        isModalVisible={isModalVisible}
        onBackdropClick={onBackdropClick}
      />
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
      <StyledForm onSubmit={submitHandler}>
        <StyledInputContainer>
          <Label htmlFor="mail">*E-mail</Label>
          <input
            id="mail"
            type="email"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              mailChangeHandler(e)
            }
            onBlur={() => {
              mailBlurHandler(true);
            }}
            required
          />

          {mailInputHasError && (
            <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
          )}
        </StyledInputContainer>
        <StyledInputContainer>
          <Label htmlFor="name">*Imię</Label>
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              nameChangeHandler(e)
            }
            onBlur={() => {
              nameBlurHandler(true);
            }}
            type="text"
            id="name"
            required
          />
          {nameInputHasError && (
            <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
          )}
        </StyledInputContainer>
        <StyledInputContainer>
          <Label htmlFor="surname">*Nazwisko</Label>
          <input
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              lastNameChangeHandler(e)
            }
            onBlur={() => {
              lastNameBlurHandler(true);
            }}
            type="text"
            id="surname"
            required
          />
          {lastNameInputHasError && (
            <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
          )}
        </StyledInputContainer>
        <StyledInputContainer>
          <Label htmlFor="birthdate">*data urodzenia</Label>
          <DatePicker
            locale="pl"
            required
            selected={startDate}
            dateFormat="dd-MM-yy"
            onChange={(date: Date | null) => setStartDate(date)}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <Label htmlFor="tel">*Telefon (previx, 9 cyfr)</Label>
          <InputTelBox>
            <InputTel type="text" defaultValue="+48" maxLength={3} />

            <input
              required
              style={{ width: "100%" }}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                phoneNumberChangeHandler(e)
              }
              onBlur={() => phoneNumberBlurHandler(true)}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              maxLength={9}
              type="tel"
              id="tel"
            />
          </InputTelBox>
          {enteredPhoneNumberHasError && (
            <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
          )}
        </StyledInputContainer>
        <StyledInputContainer />

        <Checkbox label="* Polityka prywatności" />
        <Checkbox label="Zgody marketingowe" />
        <Checkbox label="* Regulamin sprzedaży" />
      </StyledForm>
      <StyledDiv>
        <p>*Pola obowiązkowe</p>
        <div style={{ display: "flex", gap: "48px" }}>
          <ModalButton onClick={onBackdropClick} cancel>
            Anuluj
          </ModalButton>
          <ModalButton onClick={submitHandler} type="submit">
            Zapisz
          </ModalButton>
        </div>
      </StyledDiv>
    </>
  );
};
export default EditInfoModal;
