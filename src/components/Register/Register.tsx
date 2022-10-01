import {
  ErrorParagraph,
  InputWithIcon,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledInputContainer,
  StyledLabel,
  StyledWrapper,
} from "../styles/styles";
import emailIcon from "../../assets/icons/mailIcon.svg";
import lockIcon from "../../assets/icons/lockIcon.svg";

import React, { FormEvent, useEffect, useState } from "react";
import useValidation from "../../hooks/useValidation";

const Register: React.FC = () => {
  const [invalidPasswords, setInvalidPasswords] = useState<boolean>(false);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
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
    hasError: passwordCofnirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordCOnfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
    isTouched: passwordConfirmationIsTouched,
  } = useValidation((value: string) => value.trim().length >= 8);

  const data = {
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

    fetch("http://api.ultimate.systems/public/index.php/api/v1/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
              type="email"
              placeholder="piotrkowalski@gmail.com"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                mailChangeHandler(e)
              }
              onBlur={() => {
                mailBlurHandler(true);
              }}
              onFocus={() => {
                resetMailInput();
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
              type="password"
              minLength={8}
              placeholder="Minimum 8 znaków"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                passwordChangeHandler(e);
              }}
              onBlur={() => {
                passwordBlurHandler(true);
              }}
              onFocus={() => {
                resetPasswordInput();
              }}
            />{" "}
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
              placeholder="Minimum 8 znaków"
              required
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                passwordConfirmationChangeHandler(e);
              }}
              onBlur={() => {
                passwordCOnfirmationBlurHandler(true);
              }}
              onFocus={() => {
                resetPasswordConfirmationInput();
              }}
            />
            {passwordCofnirmationInputHasError && (
              <ErrorParagraph>*zbyt mała ilość znaków</ErrorParagraph>
            )}
            {invalidPasswords && <ErrorParagraph>*różne hasła</ErrorParagraph>}
          </InputWithIcon>
        </StyledInputContainer>

        <StyledButton disabled={!formIsValid}>Zarejestruj się</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
export default Register;
