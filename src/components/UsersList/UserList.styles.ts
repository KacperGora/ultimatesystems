import styled from "styled-components";
type Props = {
  isInvalid?: boolean;
  small?: boolean;
  fw?: boolean;
  search?: boolean;
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
