import Pagination from "@mui/material/Pagination";

import { styled } from "@mui/material/styles";
import {

  StyledFlexBox,
  StyledPageSelection,
} from "../../../../styles/UsersListStyles/UserList.styles";
interface Props {
  page: number;
  total: number;
  limit: number;
  setPage: Function;
  setLimit: Function;
}
const CustomizedPagination = styled(Pagination)`
  margin-top: 24px;
  * {
    font-size: 18px;
  }
  button {
    font-weight: 600;
  }

  .MuiButtonBase-root {
    font-size: 18px;
    color: black;
  }
  .Mui-selected {
    background-color: black !important;
    color: white;
  }
`;
const PaginationComponent = ({
  page,
  total,
  limit,
  setPage,
  setLimit,
}: Props) => {
  const getLastPage = () => Math.ceil(total! / limit - 1);
  return (
    <StyledFlexBox>
      <CustomizedPagination
        onChange={(e, page) => setPage(page + 1)}
        shape="circular"
        count={getLastPage() || 0}
        page={page - 1}
        hideNextButton
        hidePrevButton
        siblingCount={0}
      />

      <StyledPageSelection
        onChange={(e: React.FormEvent<HTMLSelectElement>) =>
          setLimit(e.currentTarget.value)
        }
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
      </StyledPageSelection>
    </StyledFlexBox>
  );
};

export default PaginationComponent;
