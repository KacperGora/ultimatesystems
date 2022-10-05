import React, { useState } from "react";
import {
  PaginationButton,
  PaginationContainer,
  PaginationPageInput,
} from "../../UserList.styles";

type PaginationProps = {
  page: number;
  setPage: any;
  total?: number;
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
  const getLastPage = () => Math.ceil(total! / limit);

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLimit(number);
  };
  const active = page === 1;
  return (
    <PaginationContainer>
      <PaginationButton active={active} onClick={goToFirstPage}>
        1
      </PaginationButton>
      {page > 2 ? (
        <PaginationButton onClick={decrementPage}>{page - 1}</PaginationButton>
      ) : (
        ""
      )}
      {page !== 1 ? <PaginationButton active>{page}</PaginationButton> : null}

      {page < getLastPage() ? (
        <PaginationButton onClick={incrementPage}>{page + 1}</PaginationButton>
      ) : null}
      <PaginationButton>...</PaginationButton>
      <PaginationButton onClick={goToLastPage} disabled={atLastPage()}>
        {getLastPage() || 0}
      </PaginationButton>
      <PaginationPageInput onSubmit={formSubmitHandler}>
        <label>Wyników na stronie</label>
        <div>
          <input
            min={1}
            max={total}
            type="number"
            step={1}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNumber(e.currentTarget.value)
            }
          />
          <button type="submit">OK</button>
        </div>
      </PaginationPageInput>
    </PaginationContainer>
  );
};

export default Pagination;
