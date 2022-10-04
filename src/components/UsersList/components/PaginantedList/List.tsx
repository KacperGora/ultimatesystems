import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import User from "../User";
import { useAppSelector } from "../../../../store/hook";
import Pagination from "./Pagination";
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
  const filterByActive = useAppSelector(
    (state: any) => state.query.filterByActive
  );
  const filterByName = useAppSelector((state: any) => state.query.filterByName);
  console.log(filterByName);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [typeSorting, setTypeSorting] = useState("");
  const [sortByName, setSortByName] = useState("");
  const [sortByMail, setSortByMail] = useState("");
  const [sortByLastName, setSortByLastName] = useState("");
  const [sortByBirth, setSortByBirth] = useState("");
  const [params, setParams] = useState("");

  const { data, error } = useSWR(
    ` http://api.ultimate.systems/public/index.php/api/v1/auth/users?${params}filter%5Bis_activated%5D=${filterByActive}&search=${filterByName}&page=${page}&perPage=${limit}
    `,
    fetcher
  );
  if (error) {
    throw new Error(error.message);
  }
  useEffect(() => {
    const configureUrl = (type: string) => {
      switch (type) {
        case "name":
          setParams(`sort%5Bname%5D=${sortByName}&`);
          break;

        case "surname":
          setParams(`sort%5Bsurname%5D=${sortByLastName}&`);
          break;
        case "email":
          setParams(`sort%5Bemail%5D=${sortByMail}&`);
          break;

        case "birth_date":
          setParams(`sort%5Bbirth_date%5D=${sortByBirth}&`);
          break;
      }
    };
    configureUrl(typeSorting);
  }, [sortByBirth, sortByLastName, sortByMail, sortByName, typeSorting]);

  return (
    <Container>
      <SortToolsContainer>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByName(e.currentTarget.value);
            setTypeSorting("name");
          }}
        >
          <option value="">Imię</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByLastName(e.currentTarget.value);
            setTypeSorting("surname");
          }}
        >
          <option value="">Nazwisko</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByMail(e.currentTarget.value);
            setTypeSorting("email");
          }}
        >
          <option value="">E-mail</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            setSortByBirth(e.currentTarget.value);
            setTypeSorting("birth_date");
          }}
        >
          <option value="">Data urodzenia</option>
          <option value="asc">Rosnąco</option>
          <option value="desc">Malejąco</option>
        </select>
      </SortToolsContainer>
      {data?.data.map((user: any) => (
        <User user={user} key={user.id} />
      ))}

      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={data?.total}
      />
    </Container>
  );
};
export default List;
