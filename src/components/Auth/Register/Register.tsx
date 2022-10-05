import {
  ErrorParagraph,
  InputWithIcon,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledInputContainer,
  StyledLabel,
  StyledWrapper,
} from "../../styles/styles";
import emailIcon from "../../../assets/icons/mailIcon.svg";
import lockIcon from "../../../assets/icons/lockIcon.svg";

import React, { FormEvent, useEffect, useState } from "react";
import useValidation from "../../../hooks/useValidation";
import { validateEmail } from "../Helpers/validateEmail";
import { apiCall } from "../Helpers/apiCall";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const [invalidPasswords, setInvalidPasswords] = useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

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

  // custom hook for password validation
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
    isTouched: passwordIsTouched,
  } = useValidation((value: string) => value.trim().length >= 8);

  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordConfirmationIsValid,
    hasError: passwordConfirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordCOnfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
    isTouched: passwordConfirmationIsTouched,
  } = useValidation((value: string) => value.trim().length >= 8);

  const credentials = {
    email: enteredMail,
    plainPassword: enteredPassword,
  };

  useEffect(() => {
    if (
      enteredPasswordConfirmation !== enteredPassword &&
      passwordIsTouched &&
      passwordConfirmationIsTouched
    ) {
      setInvalidPasswords(true);
    } else setInvalidPasswords(false);
  }, [
    enteredPassword,
    enteredPasswordConfirmation,
    passwordConfirmationIsTouched,
    passwordIsTouched,
  ]);

  useEffect(() => {
    if (
      enteredPasswordConfirmationIsValid &&
      enteredPasswordIsValid &&
      enteredMailIsValid &&
      !invalidPasswords
    ) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  }, [
    enteredMailIsValid,
    enteredPasswordConfirmationIsValid,
    enteredPasswordIsValid,
    invalidPasswords,
  ]);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!formIsValid) return;
    apiCall(
      "http://api.ultimate.systems/public/index.php/api/v1/register",
      credentials,
      "POST"
    ).then((data) => {
      if (data.success) {
        resetMailInput();
        resetPasswordInput();
        resetPasswordConfirmationInput();
      }
    });
  };

  return (
    <StyledWrapper>
      <h2>Zaczynamy!</h2>
      <StyledForm onSubmit={formSubmitHandler}>
        <StyledInputContainer>
          <StyledLabel>Email</StyledLabel>
          <InputWithIcon>
            <img alt="input icon" className="icon" src={emailIcon} />
            <StyledInput
              isInvalid={!enteredMailIsValid && mailIsTouched}
              required
              value={enteredMail}
              type="email"
              placeholder="piotrkowalski@gmail.com"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                mailChangeHandler(e)
              }
              onBlur={() => {
                mailBlurHandler(true);
              }}
            />
            {mailInputHasError && (
              <ErrorParagraph>*niepoprawny adres e-mail</ErrorParagraph>
            )}
          </InputWithIcon>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel>Hasło</StyledLabel>
          <InputWithIcon>
            <img alt="input icon" className="icon" src={lockIcon} />
            <StyledInput
              isInvalid={!enteredPasswordIsValid && passwordIsTouched}
              required
              value={enteredPassword}
              type="password"
              minLength={8}
              placeholder="Minimum 8 znaków"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                passwordChangeHandler(e);
              }}
              onBlur={() => {
                passwordBlurHandler(true);
              }}
            />
            {passwordInputHasError && (
              <ErrorParagraph>*zbyt mała ilość znaków</ErrorParagraph>
            )}
            {invalidPasswords && <ErrorParagraph>*różne hasła</ErrorParagraph>}
          </InputWithIcon>
        </StyledInputContainer>

        <StyledInputContainer>
          <StyledLabel>Powtórz hasło</StyledLabel>
          <InputWithIcon>
            <img alt="styled icon" className="icon" src={lockIcon} />
            <StyledInput
              isInvalid={
                !enteredPasswordConfirmationIsValid &&
                passwordConfirmationIsTouched
              }
              type="password"
              minLength={8}
              value={enteredPasswordConfirmation}
              placeholder="Minimum 8 znaków"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                passwordConfirmationChangeHandler(e);
              }}
              onBlur={() => {
                passwordCOnfirmationBlurHandler(true);
              }}
            />
            {passwordConfirmationInputHasError && (
              <ErrorParagraph>*zbyt mała ilość znaków</ErrorParagraph>
            )}
            {invalidPasswords && <ErrorParagraph>*różne hasła</ErrorParagraph>}
          </InputWithIcon>
        </StyledInputContainer>

        <StyledButton disabled={!formIsValid}>Zarejestruj się</StyledButton>
      </StyledForm>
      <Link className="link" to="/login">Masz już konto?</Link>
    </StyledWrapper>
  );
};
export default Register;
