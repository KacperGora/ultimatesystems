import styled from "styled-components";

const Container = styled.div`
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

const Key = styled.label``;

const DetailParagraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  color: #000000;
  text-align: left;
  width: 50px;
`;

const UserImg = styled.div`
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
type Props = {
  user: any;
};
const User: React.FC<Props> = ({ user }) => {
  console.log(user);
  const userName: string = user.name ? user.name : "Robert";
  const userLastName = user.surname ? user.name : "Kowalski";
  const firstLetter = userName.charAt(0).toUpperCase();
  const firstLetterLastName = userLastName.charAt(0).toUpperCase();

  const formattedDate = new Date(user.birth_date).toLocaleDateString();

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: "50px" }}>
        <UserImg>{firstLetter + firstLetterLastName}</UserImg>
        <DetailParagraph>{user.name ? user.name : "Robert"}</DetailParagraph>
      </div>
      <DetailParagraph>
        {user.surname ? user.surname : "Gowalski"}
      </DetailParagraph>
      <DetailParagraph>{user.email}</DetailParagraph>
      <DetailParagraph>{formattedDate}</DetailParagraph>
      {/* {Object.entries(user).map((user) => {
        return <div>{user.name}</div>;
      })} */}
    </Container>
  );
};

export default User;
