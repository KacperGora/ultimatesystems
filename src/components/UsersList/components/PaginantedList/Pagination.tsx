import styled from "styled-components";

import React, { useState } from "react";
type Props = {
  active?: boolean;
};
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2.4rem auto 4.8rem auto;
  > * {
    margin-right: 0.8rem;
  }
`;

const PaginationButton = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  clip-path: circle();
  font-size: 18px;
  cursor: ${(props) => (props.active ? "" : "pointer")};
  text-align: center;
  background-color: ${(props) => (props.active ? "black" : "white")};
  color: ${(props) => (props.active ? "white" : "none")};

  width: 24px;
  height: 24px;
`;

const PageInput = styled.form`
  display: flex;
  gap: 12px;
  input {
    width: 50px;
  }
  button {
    background-color: none;
    cursor: pointer;
  }
  label {
    font-size: 16px;
  }
`;
type PaginationProps = {
  page: number;
  setPage: any;
  total: number;
  limit: number;
  setLimit: any;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  total,
  limit,
  setLimit,
}) => {
  const [number, setNumber] = useState<string | number>(5);
  const goToFirstPage = () => setPage(1);

  const goToLastPage = () => setPage(getLastPage());

  const incrementPage = () => page < getLastPage() && setPage(page + 1);

  const decrementPage = () => page > 1 && setPage(page - 1);

  const atLastPage = () => page === getLastPage();

  const getLastPage = () => Math.ceil(total / limit);
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLimit(number);
  };
  const active = page === 1;
  return (
    <PaginationContainer>
      <PaginationButton active={active} onClick={() => goToFirstPage()}>
        1
      </PaginationButton>
      {page > 2 ? (
        <PaginationButton onClick={() => decrementPage()}>
          {page - 1}
        </PaginationButton>
      ) : (
        ""
      )}
      {page !== 1 ? <PaginationButton active>{page}</PaginationButton> : null}

      {page < getLastPage() ? (
        <PaginationButton onClick={() => incrementPage()}>
          {page + 1}
        </PaginationButton>
      ) : null}
      <PaginationButton>...</PaginationButton>
      <PaginationButton onClick={goToLastPage} disabled={atLastPage()}>
        {getLastPage()}
      </PaginationButton>
      <PageInput onSubmit={formSubmitHandler}>
        <label>Wyników na stronie</label>
        <div>
          <input
            min={1}
            type="number"
            step={1}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNumber(e.currentTarget.value)
            }
          />
          <button type="submit">OK</button>
        </div>
      </PageInput>
    </PaginationContainer>
  );
};

export default Pagination;
