import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { useAppSelector } from "../../../../store/hook";
import Pagination from "./Pagination";
import SingleUser from "./SingleUser";
import SortTools from "./SortTools";
import { Container, ContainerFlex } from "../../UserList.styles";

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const List: React.FC = () => {
  const filterByActive = useAppSelector(
    (state: any) => state.query.filterByActive
  );
  const filterByName = useAppSelector((state: any) => state.query.filterByName);
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
    <ContainerFlex>
      <Container>
        <SortTools
          setType={setTypeSorting}
          sortBirth={setSortByBirth}
          sortEmail={setSortByMail}
          sortLastName={setSortByLastName}
          sortName={setSortByName}
        />
        {data?.data.map((user: any) => (
          <SingleUser user={user} key={user.id} />
        ))}

        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          total={data?.total}
        />
      </Container>
    </ContainerFlex>
  );
};
export default List;
