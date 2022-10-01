import React, { FormEvent, useState, useEffect } from "react";

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
import useValidation from "../../hooks/useValidation";

const Login: React.FC = () => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  function validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

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
  useEffect(() => {
    if (enteredPasswordIsValid && enteredMailIsValid) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  }, [enteredMailIsValid, enteredPasswordIsValid]);
  const data = {
    username: enteredMail,
    password: enteredPassword,
  };
  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    fetch("http://api.ultimate.systems/public/index.php/api/v1/login/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        document.cookie = `token=${data.token};`;
      });
  };

  return (
    <StyledWrapper>
      <h2>Logowanie</h2>
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
          </InputWithIcon>
        </StyledInputContainer>
        <StyledButton title={formIsValid ? 'Zaloguj' : 'Uzupełnij poprawnie dane'} disabled={!formIsValid}>Zaloguj się</StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
export default Login;
