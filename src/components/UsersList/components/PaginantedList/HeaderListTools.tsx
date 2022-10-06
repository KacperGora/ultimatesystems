import React from "react";
import { useAppDispatch } from "../../../../store/hook";
import {

  StyledFlexWrapper,
  StyledInputList,
  SearchButton,
  SmallStyledButton,
  InputButtonsContainer,
  StyledFlexBox,
} from "../../../../styles/UsersListStyles/UserList.styles";

import {
  setFilterByActive,
  setFilterByName,
} from "../../../../store/querySlice";

const HeaderListTools: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <StyledFlexWrapper>
      <StyledFlexBox>
        <StyledInputList
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(setFilterByName(e.currentTarget.value));
          }}
          type="text"
          placeholder="Filtruj po imię, nazwisko"
        />
        <SearchButton>Szukaj</SearchButton>
      </StyledFlexBox>
      <InputButtonsContainer>
        <SmallStyledButton
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setFilterByActive(""));
          }}
        >
          Wszyscy
        </SmallStyledButton>
        <SmallStyledButton
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setFilterByActive("ACTIVE"));
          }}
        >
          Aktywni
        </SmallStyledButton>
        <SmallStyledButton
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            dispatch(setFilterByActive("INACTIVE"));
          }}
        >
          Nieaktywni
        </SmallStyledButton>
      </InputButtonsContainer>
    </StyledFlexWrapper>
  );
};
export default HeaderListTools;
