import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/hook";

import {
  StyledEditButton,
  UserListMainWrapper,
} from "../../styles/UsersListStyles/UserList.styles";

import { toggleModal } from "../../store/modalSlice";
import List from "./components/PaginantedList/List";

import HeaderListTools from "./components/PaginantedList/HeaderListTools";
import BaseModalWrapper from "../ModalPopup/BaseModalWrapper";
import EditInfoModal from "../ModalPopup/EditInfoModal";

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
        <StyledEditButton onClick={() => dispatch(toggleModal())}>
          Edytuj swoje konto
        </StyledEditButton>
        <BaseModalWrapper header="Edycja danych" content={<EditInfoModal />} />
      </DivHelper>
      <List />
    </UserListMainWrapper>
  );
};
export default UsersList;
