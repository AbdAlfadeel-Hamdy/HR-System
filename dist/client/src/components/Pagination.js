import Pagination from "@mui/material/Pagination";
const BasicPagination = ({ count }) => {
    return (<Pagination count={Math.ceil(count / 1)} className="flex justify-center"/>);
};
export default BasicPagination;
