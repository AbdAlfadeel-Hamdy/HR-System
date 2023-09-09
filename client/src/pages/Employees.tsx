import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import BasicPagination from "../components/Pagination";
import { NavLink } from "react-router-dom";
import { ColumnData } from "../components/Table";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "Nationality",
    dataKey: "nationality",
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
    label: "Passport",
    dataKey: "passportNumber",
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
    label: "Agreement Expiration",
    dataKey: "agreementExpirationDate",
  },
  {
    width: 200,
    label: "License",
    dataKey: "licenseType",
  },
  {
    width: 200,
    label: "License Expiration",
    dataKey: "licenseExpirationDate",
  },

  {
    width: 200,
    label: "Status",
    dataKey: "status",
  },
];

const Employees = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isFetching)
    return (
      <section className="grid place-content-center h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </section>
    );
  if (error) return <div>Error</div>;

  const modifiedData = data.employees.map((row: any) => {
    return {
      ...row,
      name: <NavLink to={`employees/${row._id}`}>{row.name}</NavLink>,
      idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
        "en-uk"
      ),
      passportExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
        "en-uk"
      ),
      agreementExpirationDate: new Date(
        row.idExpirationDate
      ).toLocaleDateString("en-uk"),
      licenseExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
        "en-uk"
      ),
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

export default Employees;
