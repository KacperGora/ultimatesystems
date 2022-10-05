import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import useValidation from "../../../../hooks/useValidation";

import Checkbox from "./Checkbox";
import SuccessModal from "./SuccessModal";
import { validateEmail } from "../../../Auth/Helpers/validateEmail";
import { ErrorParagraph } from "../../../styles/styles";
import { formatPhoneNumber } from "./Helpers/phoneNumberFormat";
import { phoneNumberRegexTest } from "./Helpers/phoneNumberRegexTest";
import { useAppDispatch } from "../../../../store/hook";
import { toggleModal } from "../../../../store/modalSlice";
import {
  HeaderParagraph,
  InputTel,
  InputTelBox,
  Label,
  ModalButton,
  StyledDiv,
  StyledForm,
  StyledInputContainer,
} from "./ModalPopupStyle";

registerLocale("pl", pl);
const DivHelper = styled.div`
  display: flex;
  gap: 48px;
`;
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
  useEffect(() => {
    if (
      enteredPhoneNumberIsValid &&
      enteredMailIsValid &&
      enteredNameIsValid &&
      enteredLastNameIsValid &&
      privacyPolicy &&
      sellingRegulation
    )
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [
    enteredLastNameIsValid,
    enteredMailIsValid,
    enteredNameIsValid,
    enteredPhoneNumberIsValid,
    privacyPolicy,
    sellingRegulation,
  ]);

  const refreshFn = () => {
    fetch(
      "http://api.ultimate.systems/public/index.php/api/v1/auth/token/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refresh),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("refreshToken", data.refresh_token);
        document.cookie = data.token;
      });
  };

  const patchFn = (data: {}) => {
    
    fetch("http://api.ultimate.systems/public/index.php/api/v1/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === "Proccess completed!") {
          setStatus(true);
        }
        if (data.message === "Expired JWT Token") {
          refreshFn();
        }
      });
  };
  const refresh = {
    refresh_token: localStorage.getItem("refreshToken"),
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellingRegulation) {
      setSalesError(true);
    } else setSalesError(false);
    if (!privacyPolicy) {
      setPrivacyError(true);
    } else {
      setPrivacyError(false);
    }
  

    formIsValid && patchFn(data);
  };

  return (
    <>
      {!status ? (
        <>
          <HeaderParagraph>Edycja danych</HeaderParagraph>
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
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setPrefix(e.currentTarget.value)
                  }
                />

                <input
                  required
                  style={{ width: "100%" }}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    phoneNumberChangeHandler(e)
                  }
                  onBlur={() => phoneNumberBlurHandler(true)}
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
            <StyledInputContainer>
              <Checkbox
                id="policy"
                status={(e: any) => setPrivacyPolicy(e)}
                label="* Polityka prywatności"
              />
              {privacyError && (
                <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
              )}
            </StyledInputContainer>

            <Checkbox
              id="marketing"
              status={(e: any) => setMarketingAgreements(e)}
              label="Zgody marketingowe"
            />
            <StyledInputContainer>
              <Checkbox
                id="sales"
                status={(e: any) => setSellingRegulation(e)}
                label="* Regulamin sprzedaży"
              />
              {salesError && (
                <ErrorParagraph modal>* pole obowiązkowe</ErrorParagraph>
              )}
            </StyledInputContainer>
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
