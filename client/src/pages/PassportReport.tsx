import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/table/Table";
import BasicPagination from "../components/Pagination";
import { NavLink } from "react-router-dom";
import { ColumnData } from "../components/table/Table";

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "ID",
    dataKey: "idNumber",
  },
  {
    width: 200,
    label: "Nationality",
    dataKey: "nationality",
  },
  {
    width: 200,
    label: "Passport",
    dataKey: "passportNumber",
  },
  {
    width: 200,
    label: "Passport Expiration",
    dataKey: "passportExpirationDate",
  },
];

const PassportReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/passport");
      return data;
    },
  });

  console.log(data);

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  const modifiedData = data.employees.map((row: any) => {
    return {
      ...row,
      name: <NavLink to={row._id}>{row.name}</NavLink>,
      passportExpirationDate: new Date(
        row.passportExpirationDate
      ).toLocaleDateString("en-uk"),
    };
  });

  return (
    <>
      <ReactVirtualizedTable rows={modifiedData} columns={columns} />
      <BasicPagination count={data.employeesCount} />
    </>
  );
};

export default PassportReport;
