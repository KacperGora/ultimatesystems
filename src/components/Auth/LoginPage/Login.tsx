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
} from "../../styles/styles";
import emailIcon from "../../../assets/icons/mailIcon.svg";
import lockIcon from "../../../assets/icons/lockIcon.svg";
import useValidation from "../../../hooks/useValidation";
import { setRefreshToken } from "../../../store/querySlice";
import { useAppDispatch } from "../../../store/hook";
import { validateEmail } from "../Helpers/validateEmail";
import { apiCall } from "../Helpers/apiCall";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();
  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
    isTouched: mailIsTouched,
    reset: resetMailInput,
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

  useEffect(() => {
    if (enteredPasswordIsValid && enteredMailIsValid) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  }, [enteredMailIsValid, enteredPasswordIsValid]);

  const credentials = {
    username: enteredMail,
    password: enteredPassword,
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    apiCall(
      "http://api.ultimate.systems/public/index.php/api/v1/login/check",
      credentials,
      "POST"
    ).then((data) => {
      if (data) {
        resetMailInput();
        resetPasswordInput();
      }
      document.cookie = `${data.token}`;
      localStorage.setItem("refreshToken", data.refresh_token);
      dispatch(setRefreshToken(data.refresh_token));
      navigate("/list");
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
              value={enteredMail}
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
          </InputWithIcon>
        </StyledInputContainer>
        <StyledButton
          title={formIsValid ? "Zaloguj" : "Uzupełnij poprawnie dane"}
          disabled={!formIsValid}
        >
          Zaloguj się
        </StyledButton>
      </StyledForm>
    </StyledWrapper>
  );
};
export default Login;
