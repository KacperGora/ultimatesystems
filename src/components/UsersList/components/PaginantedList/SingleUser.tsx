import React from "react";
import {
  ContainerGridList,
  DetailParagraphList,
  DivFlexContainerList,
  UserImgList,
} from "../../UserList.styles";

type Props = {
  user: {
    name: string;
    surname: string;
    email: string;
    birth_date: Date;
  };
};
const SingleUser: React.FC<Props> = ({ user }) => {
  const userName: string = user.name ? user.name : "Robert";
  const userLastName = user.surname ? user.name : "Kowalski";
  const firstLetter = userName.charAt(0).toUpperCase();
  const firstLetterLastName = userLastName.charAt(0).toUpperCase();

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
