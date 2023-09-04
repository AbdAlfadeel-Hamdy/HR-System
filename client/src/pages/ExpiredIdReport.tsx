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
    label: "ID Expiration",
    dataKey: "idExpirationDate",
  },
  {
    width: 200,
    label: "Passport Expiration",
    dataKey: "passportExpirationDate",
  },
  {
    width: 200,
    label: "Sponsor",
    dataKey: "sponsor",
  },
  {
    width: 200,
    label: "Work In",
    dataKey: "workIn",
  },

  {
    width: 200,
    label: "Status",
    dataKey: "status",
  },
];

const ExpiredIdReport = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees/expired-id");
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
      idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
        "en-uk"
      ),
      passportExpirationDate: new Date(
        row.passportExpirationDate
      ).toLocaleDateString("en-uk"),
      status:
        row.status === "duty" ? "\uD83D\uDFE2 Duty" : "\uD83D\uDFE1 Vacation",
    };
  });

  return (
    <>
      <ReactVirtualizedTable rows={modifiedData} columns={columns} />
      <BasicPagination count={data.employeesCount} />
    </>
  );
};

export default ExpiredIdReport;
