import { SortToolsContainer } from "../../../../styles/UsersListStyles/UserList.styles";
import React from "react";

interface SortToolsProps {
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
}: SortToolsProps) => {
  const sortingTools = [
    {
      option1: "Imię",
      option2: "A-Z",
      option3: "Z-A",
      option1Value: "",
      option2Value: "asc",
      option3Value: "desc",
      type: "name",
      onChange: sortName,
    },
    {
      option1: "Nazwisko",
      option2: "A-Z",
      option3: "Z-A",
      option1Value: "",
      option2Value: "asc",
      option3Value: "desc",
      type: "surname",
      onChange: sortLastName,
    },
    {
      option1: "E-mail",
      option2: "A-Z",
      option3: "Z-A",
      option1Value: "",
      option2Value: "asc",
      option3Value: "desc",
      type: "email",
      onChange: sortEmail,
    },
    {
      option1: "Data urodzenia",
      option2: "Rosnąco",
      option3: "Malejąco",
      option1Value: "",
      option2Value: "asc",
      option3Value: "desc",
      type: "birth_date",
      onChange: sortBirth,
    },
  ];
  return (
    <SortToolsContainer>
      {sortingTools.map((tool) => (
        <select
          key={tool.type}
          style={{ border: "none" }}
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            tool.onChange(e.currentTarget.value);
            setType(tool.type);
          }}
        >
          <option value={tool.option1Value}>{tool.option1}</option>
          <option value={tool.option2Value}>{tool.option2}</option>
          <option value={tool.option3Value}>{tool.option3}</option>
        </select>
      ))}
    </SortToolsContainer>
  );
};

export default SortTools;
