import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/table/Table";
// import BasicPagination from "../components/Pagination";
import { NavLink } from "react-router-dom";
import { ColumnData } from "../components/table/Table";
import { downloadPDF } from "../utils/downloadPDF";

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
  // {
  //   width: 200,
  //   label: "Work In",
  //   dataKey: "workIn",
  // },

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
    staleTime: 1000 * 60 * 3,
  });

  if (isFetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  console.log(data.employees);
  const modifiedData = data.employees.map((row: any) => {
    return {
      ...row,
      idExpirationDate: new Date(row.idExpirationDate).toLocaleDateString(
        "en-uk"
      ),
      passportExpirationDate: new Date(
        row.passportExpirationDate
      ).toLocaleDateString("en-uk"),
    };
  });

  return (
    <>
      <ReactVirtualizedTable
        rows={modifiedData.map((row: any) => ({
          ...row,
          name: <NavLink to={row._id}>{row.name}</NavLink>,
          status:
            row.status === "duty"
              ? "\uD83D\uDFE2 Duty"
              : "\uD83D\uDFE1 Vacation",
        }))}
        columns={columns}
      />
      {/* <BasicPagination count={data.employeesCount} /> */}
      <button
        onClick={() => downloadPDF("Driver Report", columns, modifiedData)}
      >
        Download
      </button>
    </>
  );
};

export default ExpiredIdReport;
