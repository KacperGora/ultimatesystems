import styled from "styled-components";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hook";

import { setFilterByActive, setFilterByName } from "../../../store/querySlice";
import { InputWithIcon, StyledButton, StyledInput } from "../../styles/styles";
import { ButtonHeaderContainer, StyledFlexWrapper } from "../UserList.styles";
const DivHelper = styled.div`
  padding-left: 26px;
`;

const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <StyledFlexWrapper>
        <DivHelper>
          <InputWithIcon>
            <StyledInput
              search
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                dispatch(setFilterByName(e.currentTarget.value));
              }}
              type="text"
              placeholder="Filtruj po imię, nazwisko"
            />
            <StyledButton className="searchBtn" small fw search>
              Szukaj
            </StyledButton>
          </InputWithIcon>
        </DivHelper>
        <ButtonHeaderContainer>
          <StyledButton
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              dispatch(setFilterByActive(""));
            }}
            small
          >
            Wszyscy
          </StyledButton>
          <StyledButton
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              dispatch(setFilterByActive("ACTIVE"));
            }}
            small
          >
            Aktywni
          </StyledButton>
          <StyledButton
            onClick={(e: React.FormEvent<HTMLButtonElement>) => {
              dispatch(setFilterByActive("INACTIVE"));
            }}
            small
          >
            Nieaktywni
          </StyledButton>
        </ButtonHeaderContainer>
      </StyledFlexWrapper>
    </>
  );
};
export default Header;
