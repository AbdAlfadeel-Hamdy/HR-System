import Pagination from "@mui/material/Pagination";

interface BasicPaginationProps {
  count: number;
}

const BasicPagination: React.FC<BasicPaginationProps> = ({ count }) => {
  return (
    <Pagination count={Math.ceil(count / 1)} className="flex justify-center" />
  );
};

export default BasicPagination;
