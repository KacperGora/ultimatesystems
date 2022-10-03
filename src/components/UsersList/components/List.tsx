import useSWR from "swr";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import User from "./User";
// import Plant from "./Plant";
// import Pagination from "./Pagination";
// import SortButton from "./SortButton";

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

const PlantContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  height: 40px;
`;

const List: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, seFilter] = useState("INACTIVE");
  const [sortById, setSortById] = useState("");
  const [sortByName, setSortByName] = useState("");
  const [sortByLastName, setSortByLastName] = useState("");
  const [sortByBirth, setSortByBirth] = useState("desc");
  const [order, setOrder] = useState("desc");
  const limit = 10;
  const { data, error } = useSWR(
    `  http://api.ultimate.systems/public/index.php/api/v1/auth/users?filter%5Bis_activated%5D=${filter}&sort%5Bid%5D=${sortById}&sort%5Bname%5D=${sortByName}&sort%5Bsurname%5D=${sortByLastName}&sort%5Bbirth_date%5D=${sortByBirth}&page=1&perPage=10`,
    fetcher
  );
// data.data.map((user: any)=> console.log(user))
  // if (!data || !data.items) {
  //   return null;
  // }
  return (
    <Container>
      {/* <SortButton order={order} setOrder={setOrder} /> */}
     
      {data?.data.map((user: any) =><User user={user} key={user.id}/>)}
     
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
