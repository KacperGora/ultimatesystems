import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import useValidation from "../../hooks/useValidation";

import Checkbox from "./Checkbox";
import SuccessModal from "./SuccessModal";
import { validateEmail } from "../Auth/Helpers/validateEmail";
import { ErrorParagraph } from "../../styles/AuthStyles/styles";
import { formatPhoneNumber } from "./Helpers/phoneNumberFormat";
import { phoneNumberRegexTest } from "./Helpers/phoneNumberRegexTest";
import { useAppDispatch } from "../../store/hook";
import { toggleModal } from "../../store/modalSlice";

import apiCallFn from "../../hooks/apiCallFn";
import { refreshTokenFn } from "./Helpers/RefreshToken";
import {
  HeaderParagraph,
  InputTel,
  InputTelBox,
  Label,
  ModalButton,
  StyledDiv,
  StyledForm,
  StyledInputContainer,
} from "../../styles/AuthStyles/ModalStyles/ModalPopupStyle";

registerLocale("pl", pl);
const DivHelper = styled.div`
  display: flex;
  gap: 48px;
`;
type ReactInputType = React.FormEvent<HTMLInputElement>;

const EditInfoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [privacyError, setPrivacyError] = useState(false);
  const [salesError, setSalesError] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [marketingAgreements, setMarketingAgreements] = useState(false);
  const [sellingRegulation, setSellingRegulation] = useState(false);
  const [prefix, setPrefix] = useState("");
  const [status, setStatus] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
  } = useValidation(
    (value: string) => value.trim() !== "" && validateEmail(value)
  );

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useValidation((value: string) => value.trim() !== "");
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useValidation((value: string) => value.trim() !== "");

  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: enteredPhoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useValidation((value: string) => phoneNumberRegexTest(value));

  const data = {
    mail: enteredMail,
    name: enteredName,
    surname: enteredLastName,
    birthDate: startDate,
    phoneNumber: +enteredPhoneNumber,
    phonePrefix: prefix,
    privacyPolicy,
    marketingAgreements,
    sellingRegulation,
  };

  const formPreValid: boolean =
    enteredPhoneNumberIsValid &&
    enteredMailIsValid &&
    enteredNameIsValid &&
    enteredLastNameIsValid &&
    privacyPolicy &&
    sellingRegulation;

  useEffect(() => {
    formPreValid && setFormIsValid(true);
  }, [
    enteredLastNameIsValid,
    enteredMailIsValid,
    enteredNameIsValid,
    enteredPhoneNumberIsValid,
    formPreValid,
    privacyPolicy,
    sellingRegulation,
  ]);

  !document.cookie && refreshTokenFn();

  const patchUserInfoFn = () => {
    apiCallFn(
      "http://api.ultimate.systems/public/index.php/api/v1/auth/user",
      data,
      "PATCH"
    ).then(async (data) => {
      data === "Proccess completed!" && setStatus(true);
      if (data.message === "Expired JWT Token") {
        await refreshTokenFn();
        patchUserInfoFn();
      }
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellingRegulation) {
      setSalesError(true);
    } else {
      setSalesError(false);
    }
    if (!privacyPolicy) {
      setPrivacyError(true);
    } else {
      setPrivacyError(false);
    }

    formIsValid && patchUserInfoFn();
  };

  const errorText = "* pole obowiązkowe";
  const formInputsCfg = [
    {
      id: "mail",
      label: "*E-mail",
      type: "email",
      changeHandler: mailChangeHandler,
      blurHandler: mailBlurHandler,
      error: mailInputHasError,
    },
    {
      id: "name",
      label: "*Imię",
      type: "text",
      changeHandler: nameChangeHandler,
      blurHandler: nameBlurHandler,
      error: nameInputHasError,
    },
    {
      id: "surname",
      label: "*Nazwisko",
      type: "text",
      changeHandler: lastNameChangeHandler,
      blurHandler: lastNameBlurHandler,
      error: lastNameInputHasError,
    },
  ];

  const checkboxCfg = [
    {
      id: "policy",
      label: "* Polityka prywatności",
      status: setPrivacyPolicy,
      error: privacyError,
    },
    {
      id: "marketing",
      label: "Zgody marketingowe",
      status: setMarketingAgreements,
    },
    {
      id: "sales",
      label: "* Regulamin sprzedaży",
      status: setSellingRegulation,
      error: salesError,
    },
  ];

  return (
    <>
      {!status ? (
        <>
          <HeaderParagraph>Edycja danych</HeaderParagraph>
          <StyledForm onSubmit={submitHandler}>

            
            {formInputsCfg.map((el) => (
              <StyledInputContainer key={el.id}>
                <Label htmlFor={el.id}>*E-mail</Label>
                <input
                  id={el.id}
                  type={el.type}
                  onChange={(e) => el.changeHandler(e)}
                  onBlur={() => el.blurHandler(true)}
                  required
                />
                {el.error && <ErrorParagraph>{errorText}</ErrorParagraph>}
              </StyledInputContainer>
            ))}

            <StyledInputContainer>
              <Label htmlFor="birthdate">*data urodzenia</Label>
              <DatePicker
                locale="pl"
                required
                showMonthDropdown
                id="birthdate"
                showYearDropdown
                dropdownMode="select"
                selected={startDate ? startDate : new Date()}
                dateFormat="dd.MM.yyyy"
                onChange={(date: Date) => setStartDate(date)}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <Label htmlFor="tel">*Telefon (previx, 9 cyfr)</Label>
              <InputTelBox>
                <InputTel
                  type="text"
                  defaultValue="+48"
                  maxLength={3}
                  onChange={(e: ReactInputType) =>
                    setPrefix(e.currentTarget.value)
                  }
                />
                <input
                  required
                  style={{ width: "100%" }}
                  onChange={(e: ReactInputType) => phoneNumberChangeHandler(e)}
                  onBlur={() => phoneNumberBlurHandler(true)}
                  type="tel"
                  id="tel"
                  maxLength={11}
                  value={formatPhoneNumber(enteredPhoneNumber)}
                />
              </InputTelBox>
              {enteredPhoneNumberHasError && (
                <ErrorParagraph>{errorText}</ErrorParagraph>
              )}
            </StyledInputContainer>
            <StyledInputContainer />

            {checkboxCfg.map((box) => (
              <StyledInputContainer>
                <Checkbox
                  id={box.id}
                  status={(e: any) => box.status(e)}
                  label={box.label}
                />
                {box.error && <ErrorParagraph>{errorText}</ErrorParagraph>}
              </StyledInputContainer>
            ))}
          </StyledForm>
          <StyledDiv>
            <p>*Pola obowiązkowe</p>
            <DivHelper>
              <ModalButton onClick={() => dispatch(toggleModal())} cancel>
                Anuluj
              </ModalButton>
              <ModalButton onClick={submitHandler} type="submit">
                Zapisz
              </ModalButton>
            </DivHelper>
          </StyledDiv>
        </>
      ) : (
        <SuccessModal />
      )}
    </>
  );
};

export default EditInfoModal;
