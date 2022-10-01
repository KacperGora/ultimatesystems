import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton, StyledWrapper } from "../styles/styles";
import Header from "./components/Header";
import List from "./components/List";
import BaseModalWrapper from "./components/ModalPopup/BaseModalWrapper";
import EditInfoModal from "./components/ModalPopup/EditInfoModal";
import { UserListMainWrapper } from "./UserList.styles";

const UsersList: React.FC = () => {
  const [fetchedData, setFetchedData] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible((wasModalVisible) => !wasModalVisible);
  };

  const DivHelper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 8rem;
  `;
  return (
    <>
      <UserListMainWrapper>
        <Header />
        <DivHelper>
          <StyledButton onClick={toggleModal} fw small edit>
            Edytuj swoje konto
          </StyledButton>
          <BaseModalWrapper
            isModalVisible={isModalVisible}
            onBackdropClick={toggleModal}
            header="Edycja danych"
            content={
              <EditInfoModal
                isModalVisible={isModalVisible}
                onBackdropClick={toggleModal}
              />
            }
          />
        </DivHelper>
        <List />
      </UserListMainWrapper>
    </>
  );
};
export default UsersList;
