import { SortToolsContainer } from "../../UserList.styles";
import React from "react";

interface ChildProps {
  setType: React.Dispatch<React.SetStateAction<string>>;
  sortName: React.Dispatch<React.SetStateAction<string>>;
  sortLastName: React.Dispatch<React.SetStateAction<string>>;
  sortEmail: React.Dispatch<React.SetStateAction<string>>;
  sortBirth: React.Dispatch<React.SetStateAction<string>>;
}
const SortTools = ({
  setType,
  sortName,
  sortLastName,
  sortEmail,
  sortBirth,
}: ChildProps) => {
  //   const [typeSorting, setTypeSorting] = useState("");

  return (
    <SortToolsContainer>
      <select
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          sortName(e.currentTarget.value);
          setType("name");
        }}
      >
        <option value="">Imię</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          sortLastName(e.currentTarget.value);
          setType("surname");
        }}
      >
        <option value="">Nazwisko</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          sortEmail(e.currentTarget.value);
          setType("email");
        }}
      >
        <option value="">E-mail</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        onChange={(e: React.FormEvent<HTMLSelectElement>) => {
          sortBirth(e.currentTarget.value);
          setType("birth_date");
        }}
      >
        <option value="">Data urodzenia</option>
        <option value="asc">Rosnąco</option>
        <option value="desc">Malejąco</option>
      </select>
    </SortToolsContainer>
  );
};

export default SortTools;
