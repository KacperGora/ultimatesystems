import React from "react";
import {
  ContainerGridList,
  DetailParagraphList,
  DivFlexContainerList,
  UserImgList,
} from "../../../../styles/UsersListStyles/UserList.styles";

type Props = {
  user: {
    name: string;
    surname: string;
    email: string;
    birth_date: Date;
  };
};

const SingleUser: React.FC<Props> = ({ user }) => {
  const formatFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase();
  };

  const userName: string = user.name ? user.name : "Robert";
  const userLastName = user.surname ? user.surname : "Kowalski";
  const firstLetter = formatFirstLetter(userName);
  const firstLetterLastName = formatFirstLetter(userLastName);

  const formattedDate = new Date(user.birth_date).toLocaleDateString();

  return (
    <ContainerGridList>
      <DivFlexContainerList>
        <UserImgList>{firstLetter + firstLetterLastName}</UserImgList>
        <DetailParagraphList>{user.name}</DetailParagraphList>
      </DivFlexContainerList>
      <DetailParagraphList>{user.surname}</DetailParagraphList>
      <DetailParagraphList>{user.email}</DetailParagraphList>
      <DetailParagraphList>{formattedDate}</DetailParagraphList>
    </ContainerGridList>
  );
};

export default SingleUser;
