import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/hook";
import { StyledButton } from "../styles/styles";

import BaseModalWrapper from "./components/ModalPopup/BaseModalWrapper";
import EditInfoModal from "./components/ModalPopup/EditInfoModal";
import { UserListMainWrapper } from "./UserList.styles";

import { toggleModal } from "../../store/modalSlice";
import List from "./components/PaginantedList/List";

import HeaderListTools from "./components/PaginantedList/HeaderListTools";

const DivHelper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8rem;
`;

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <UserListMainWrapper>
      <HeaderListTools />
      <DivHelper>
        <StyledButton onClick={() => dispatch(toggleModal())} fw small edit>
          Edytuj swoje konto
        </StyledButton>
        <BaseModalWrapper header="Edycja danych" content={<EditInfoModal />} />
      </DivHelper>
      <List />
    </UserListMainWrapper>
  );
};
export default UsersList;
