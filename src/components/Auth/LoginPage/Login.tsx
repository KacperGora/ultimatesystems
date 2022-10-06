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
} from "../../../styles/AuthStyles/styles";
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
      id: "",
      label: "Hasło",
      type: "password",
      changeHandler: passwordChangeHandler,
      blurHandler: passwordBlurHandler,
      placeHolder: "Hasło",
      error: passwordInputHasError,
      errorMsg: "zbyt mała ilość znaków",
      icon: lockIcon,
      isInvalid: !enteredPasswordIsValid && passwordIsTouched,
    },
  ];

  return (
    <StyledWrapper>
      <h2>Logowanie</h2>
      <StyledForm onSubmit={formSubmitHandler}>
        {formInputsCfg.map((el) => (
          <StyledInputContainer key={el.label}>
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
                onBlur={() => el.blurHandler(true)}
              />
              {el.error && <ErrorParagraph>{el.errorMsg}</ErrorParagraph>}
            </InputWithIcon>
          </StyledInputContainer>
        ))}
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
