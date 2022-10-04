import styled from "styled-components";
import List from "./List";
import React from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  > * {
    margin-right: 0.8rem;
  }
`;

const PaginatedList: React.FC = () => {
  return (
    <Container>
      <List />
    
   
    </Container>
  );
};

export default PaginatedList;
