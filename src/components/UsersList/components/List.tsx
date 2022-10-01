import { ButtonHeaderContainer, StyledFlexWrapper } from "../UserList.styles";

const List: React.FC = () => {
  return (
    <>
      <StyledFlexWrapper>
        <>
          <select name="Imię">
            <option>Imię</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
          <select>
            <option>Nazwisko</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
          <select>
            <option>E-mail</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
          <select>
            <option>Data urodzenia</option>
            <option>Rosnąco</option>
            <option>Malejąco</option>
          </select>
        </>
      </StyledFlexWrapper>
      <StyledFlexWrapper>
        <ul>
          <li>Marek Rostowski m.rostowski@mail.pl 30.12.1997</li>
          <li>Marek Rostowski m.rostowski@mail.pl 30.12.1997</li>
          <li>Marek Rostowski m.rostowski@mail.pl 30.12.1997</li>
        </ul>
      </StyledFlexWrapper>
    </>
  );
};
export default List;
