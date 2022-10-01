import styled from "styled-components";
import {
  InputWithIcon,
  StyledButton,
  StyledInput,
  StyledWrapper,
} from "../../styles/styles";
import { ButtonHeaderContainer, StyledFlexWrapper } from "../UserList.styles";
const DivHelper = styled.div`
  padding-left: 26px;
`;

const Header: React.FC = () => {
  return (
    <>
      <StyledFlexWrapper>
        <DivHelper>
          <InputWithIcon>
            <StyledInput
              search
              type="text"
              placeholder="Filtruj po imię, nazwisko"
            />
            <StyledButton className="searchBtn" small fw search>
              Szukaj
            </StyledButton>
          </InputWithIcon>
        </DivHelper>
        <ButtonHeaderContainer>
          <StyledButton small>Wszyscy</StyledButton>
          <StyledButton small>Aktywni</StyledButton>
          <StyledButton small>Nieaktywni</StyledButton>
        </ButtonHeaderContainer>
      </StyledFlexWrapper>
    </>
  );
};
export default Header;
