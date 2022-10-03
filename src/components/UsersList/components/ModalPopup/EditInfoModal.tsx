import React, { useState } from "react";

import {
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
import pl from "date-fns/locale/pl";
import Checkbox from "./Checkbox";
registerLocale("pl", pl);

interface EditInfoModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
}

const EditInfoModal: React.FC<EditInfoModalProps> = ({
  isModalVisible,
  onBackdropClick,
}) => {
  const [startDate, setStartDate] = useState<Date | null>();
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [marketingConsents, setMarketingConsents] = useState(false);
  const [salesRegulations, setSalesRegulations] = useState(false);
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

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: enteredPhoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
    isTouched: phoneNumberIsTouched,
  } = useValidation((value: string) =>
    /\d{3}[ ]?\d{3}[ ]?\d{3}(?!\w)/.test(value)
  );
  console.log(enteredPhoneNumberHasError);
  const data = {
    mail: enteredMail,
    name: enteredName,
    lastName: enteredLastName,
    birthDate: startDate,
    phoneNumber: enteredPhoneNumber,
    privacyPolicy,
    marketingConsents,
    salesRegulations,
  };
  function formatPhoneNumber(enteredPhoneNumber: string) {
    if (!enteredPhoneNumber) return enteredPhoneNumber;
    const phoneNumber = enteredPhoneNumber.replace(/[^\d]/g, "");
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(
      3,
      6
    )} ${phoneNumber.slice(6, 9)}`;
  }
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // resetNameInput()
    // resetMailInput()
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
            value={enteredMail}
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
            value={enteredName}
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
            value={enteredLastName}
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
              type="tel"
              id="tel"
              maxLength={11}
              value={formatPhoneNumber(enteredPhoneNumber)}
            />
          </InputTelBox>
          {enteredPhoneNumberHasError && (
            <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
          )}
        </StyledInputContainer>
        <StyledInputContainer />

        <Checkbox
          status={(e: any) => setPrivacyPolicy(e)}
          label="* Polityka prywatności"
        />
        <Checkbox
          status={(e: any) => setMarketingConsents(e)}
          label="Zgody marketingowe"
        />
        <Checkbox
          status={(e: any) => setSalesRegulations(e)}
          label="Z* Regulamin sprzedaży"
        />
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
