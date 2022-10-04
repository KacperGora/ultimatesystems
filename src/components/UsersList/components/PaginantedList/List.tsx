import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import User from "../User";
// import Plant from "./Plant";
// import Pagination from "./Pagination";
// import SortButton from "./SortButton";
import { QueryParamProvider } from "use-query-params";
import { useAppSelector } from "../../../../store/hook";
const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  width: 100%;
`;

const SortToolsContainer = styled.div`
  display: flex;
  gap: 180px;
  font-size: 24px;
  width: 100%;
  margin-left: 24rem;
`;

const List: React.FC = () => {
  const byActive = useAppSelector((state: any) => state.query.byActive);
  const byName = useAppSelector((state: any) => state.query.byName);
  console.log(byName);
  const [page, setPage] = useState(1);
  const [sortByName, setSortByName] = useState("");
  const [sortByMail, setSortByMail] = useState("");
  const [sortByLastName, setSortByLastName] = useState("");
  const [sortByBirth, setSortByBirth] = useState("");
  const [order, setOrder] = useState("");
  const limit = 10;
  // fetch()
  const { data, error } = useSWR(
    `  http://api.ultimate.systems/public/index.php/api/v1/auth/users?sort%5Bname%5D=${sortByName}&sort%5Bemail%5D=${sortByMail}&filter%5Bis_activated%5D=${byActive}&sort%5Bbirth_date%5D=${sortByBirth}&search=${byName}&page=1&perPage=34`,
    fetcher
  );

  // fetch(
  //   "http://api.ultimate.systems/public/index.php/api/v1/auth/users?sort%5B&sort%5Bsurname%5D=desc&page=1&perPage=5",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  return (
    <Container>
      <SortToolsContainer>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByName(e.currentTarget.value);
          }}
        >
          <option value="">Imię</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByLastName(e.currentTarget.value);
          }}
        >
          <option value="">Nazwisko</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByMail(e.currentTarget.value);
          }}
        >
          <option value="">E-mail</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) =>
            setSortByBirth(e.currentTarget.value)
          }
        >
          <option value="">Data urodzenia</option>
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </SortToolsContainer>
      {data?.data.map((user: any) => (
        <User user={user} key={user.id} />
      ))}

      {/* <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        total={data.total}
      /> */}
    </Container>
  );
};
export default List;
