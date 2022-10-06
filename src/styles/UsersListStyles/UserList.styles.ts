import styled from "styled-components";

export const StyledFlexBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledFlexWrapper = styled(StyledFlexBox)`
  justify-content: space-between;
  align-items: center;
  height: 120px;
  padding: 12px;
  border: 0.25px solid #676767;
  border-radius: 8px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;
export const InputButtonsContainer = styled(StyledFlexBox)`
  gap: 24px;
`;
export const ButtonHeaderContainer = styled(InputButtonsContainer)`
  margin-right: 175px;
`;

export const UserImgList = styled(StyledFlexBox)`
  background-color: #589103;
  color: white;
  text-align: center;
  font-size: 24px;
  align-items: center;
  padding: 8px;
  clip-path: circle();
`;

export const DivFlexContainerList = styled(StyledFlexBox)`
  align-items: center;
  gap: 70px;
`;

export const Container = styled(StyledFlexBox)`
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;
export const ContainerFlex = styled(StyledFlexBox)`
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  > * {
    margin-right: 0.8rem;
  }
`;

const Button = styled.button`
  background-color: white;
  transition: all 300ms;
  border-radius: 12px;

  cursor: pointer;
  &:hover {
    background-color: #24399b;
    color: white;
  }

  @media (max-width: 1200px) {
    font-size: 12px;
  }
  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export const StyledEditButton = styled(Button)`
  border: 1px solid #24399b;
  font-size: 18px;
  background-color: white;
  font-weight: 600;
  opacity: 1;
  min-width: 220px;
  min-height: 50px;

  :hover {
    color: white;
    background-color: #24399b;
  }
  :disabled {
    color: rgba(200, 200, 200, 0.9);
    background-color: rgba(175, 175, 175, 0.2);
    cursor: not-allowed;
  }

  @media (max-width: 1000px) {
    font-size: 14px;
    min-width: 160px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    min-width: 140px;
  }
`;

export const SearchButton = styled(Button)`
  border: 1px solid #24399b;
  padding: 12px 40px;
  font-size: 18px;
  font-weight: 600;
  opacity: 1;
  z-index: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 1200px) {
    padding: 12px 20px;
  }
`;

export const SmallStyledButton = styled(Button)`
  font-size: 14px;
  padding: 6px 0px;
  border: 0.25px solid #676767;
  min-width: 152px;
  min-height: 42px;

  @media (max-width: 1200px) {
    font-size: 12px;
  }
  @media (max-width: 900px) {
    min-width: 60px;
  }
`;

export const StyledInputList = styled.input`
  border: 0.25px solid #676767;
  border-radius: 12px;
  opacity: 1;
  padding-left: 40px;
  width: 400px;
  outline: none;
  position: relative;
  left: 25px;
  z-index: 1;

  @media (max-width: 1200px) {
    font-size: 12px;
    width: 70%;
  }
  @media (max-width: 1200px) {
    font-size: 12px;
    padding: 0 20px 0 50px;
  }
  @media (max-width: 900px) {
    font-size: 10px;
  }
`;

export const UserListMainWrapper = styled.div`
  max-width: 140rem;
  margin: 2.4rem auto;
`;

export const DetailParagraphList = styled.p`
  font-size: 16px;
  font-weight: 300;
  text-align: left;
  width: 5rem;
  @media (max-width: 1000px) {
    font-size: 12px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
const Grid = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: space-between;
`;
export const SortToolsContainer = styled(Grid)`
  margin: 2rem auto 0 auto;
  width: 90vw;
  margin-left: 35px;
  padding: 0.6rem;
  width: 100%;

  select {
    background-color: none;
    font-weight: 600;
    outline: none;
  }
`;

export const ContainerGridList = styled(Grid)`
  margin: 2rem auto 0 auto;
  width: 100%;
  border: 0.25px solid;
  min-height: 90px;
  border-radius: 8px;

  > * {
    text-align: left;
  }
`;

export const StyledPageSelection = styled.select`
  border: none;
  text-align: center;
  margin-top: 20px;
  align-self: center;
  font-weight: 600;
  cursor: pointer;
`;
