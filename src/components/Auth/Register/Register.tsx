import {
  ErrorParagraph,
  InputWithIcon,
  StyledButton,
  StyledForm,
  StyledInput,
  StyledInputContainer,
  StyledLabel,
  StyledWrapper,
} from "../../../styles/AuthStyles/styles";
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
  const formInputsCfg = [
    {
      id: "mail",
      label: "Email",
      type: "email",
      placeHolder: "piotrkowalski@gmail.com",
      changeHandler: mailChangeHandler,
      blurHandler: mailBlurHandler,
      error: mailInputHasError,
      errorMsg: "*niepoprawny adres e-mail",
      icon: emailIcon,
      isInvalid: !enteredMailIsValid && mailIsTouched,
    },

    {
      id: "password",
      label: "Hasło",
      type: "password",
      changeHandler: passwordChangeHandler,
      blurHandler: passwordBlurHandler,
      placeHolder: "Hasło",
      error: passwordInputHasError,
      errorMsg: "zbyt mała ilość znaków",
      icon: lockIcon,
      isInvalid: !enteredPasswordIsValid && passwordIsTouched,
      differentPassword: invalidPasswords,
      differentPasswordMessage: <ErrorParagraph>*różne hasła</ErrorParagraph>,
    },
    {
      id: "confirmPassword",
      label: "Powtórz hasło",
      type: "password",
      changeHandler: passwordConfirmationChangeHandler,
      blurHandler: passwordCOnfirmationBlurHandler,
      placeHolder: "Powtórz hasło",
      error: passwordConfirmationInputHasError,
      errorMsg: "zbyt mała ilość znaków",
      icon: lockIcon,
      isInvalid:
        !enteredPasswordConfirmationIsValid && passwordConfirmationIsTouched,
      differentPassword: invalidPasswords,
      differentPasswordMessage: <ErrorParagraph>*różne hasła</ErrorParagraph>,
    },
  ];
  return (
    <StyledWrapper>
      <h2>Zaczynamy!</h2>
      <StyledForm onSubmit={formSubmitHandler}>
        {formInputsCfg.map((el) => (
          <StyledInputContainer key={el.id}>
            <StyledLabel>{el.label}</StyledLabel>
            <InputWithIcon>
              <img alt="input icon" className="icon" src={el.icon} />
              <StyledInput
                isInvalid={el.isInvalid}
                required
                type={el.type}
                placeholder={el.placeHolder}
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  el.changeHandler(e)
                }
                onBlur={() => {
                  el.blurHandler(true);
                }}
              />
              {el.error && <ErrorParagraph>{el.errorMsg}</ErrorParagraph>}
              {el.differentPassword && el.differentPasswordMessage}
            </InputWithIcon>
          </StyledInputContainer>
        ))}
        <StyledButton disabled={!formIsValid}>Zarejestruj się</StyledButton>
      </StyledForm>
      <Link className="link" to="/login">
        Masz już konto?
      </Link>
    </StyledWrapper>
  );
};
export default Register;
