import styled from "styled-components";
type Props = {
  active?: boolean;
};
export const StyledFlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 140rem;
  height: 120px;
  margin: 2.4rem auto;
  padding: 12px;
  border: 0.25px solid #676767;
  border-radius: 8px;
`;
export const ButtonHeaderContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-right: 175px;
`;
export const UserListMainWrapper = styled.div`
  max-width: 140rem;
  margin: 2.4rem auto;
`;
// USER
export const ContainerGridList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-content: space-between;
  border: 0.25px solid #676767;
  width: 100%;
  min-height: 90px;
  border-radius: 8px;
  padding: 0.6rem;
  margin-top: 2rem;

  > * {
    margin-right: 20rem;
    text-align: left;
  }
`;

export const DetailParagraphList = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #000000;
  text-align: left;
  width: 50px;
`;

export const UserImgList = styled.div`
  height: 60px;
  width: 60px;
  background-color: #589103;
  border-radius: 50px;
  color: white;
  text-align: center;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DivFlexContainerList = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;
//
export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2.4rem auto 4.8rem auto;
  > * {
    margin-right: 0.8rem;
  }
`;

export const PaginationButton = styled.button<Props>`
  display: flex;

  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  clip-path: circle();
  font-size: 18px;
  cursor: ${(props) => (props.active ? "" : "pointer")};
  text-align: center;
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "none")};
  width: 24px;
  height: 24px;
`;

export const PaginationPageInput = styled.form`
  display: flex;

  gap: 12px;
  input {
    width: 50px;
    border: none;
    border-bottom: 1px solid #5c5c5c;
    outline: none;
    text-align: center;
  }
  button {
    background-color: white;
    border: none;

    cursor: pointer;
  }
  label {
    font-size: 16px;
  }
`;
//
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

export const SortToolsContainer = styled.div`
  display: flex;
  gap: 180px;
  font-size: 24px;
  width: 100%;
  margin-left: 24rem;
`;
export const ContainerFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  > * {
    margin-right: 0.8rem;
  }
`;
