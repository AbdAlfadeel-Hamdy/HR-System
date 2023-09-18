import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/Table";
import BasicPagination from "../components/Pagination";
import { NavLink } from "react-router-dom";
import { ColumnData } from "../components/Table";
import { useEffect, useState } from "react";
import { LoadingSection } from "../components";

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
  const [idNumber, setIdNumber] = useState("");
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get(
        `/employees${idNumber ? `?idNumber=${idNumber}` : ""}`
      );
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch();
    }, 3000);

    return () => clearTimeout(timer);
  }, [idNumber, refetch]);

  if (isFetching) return <LoadingSection />;
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
      <div className="flex flex-col">
        <div className="bg-black h-12 flex justify-center items-center">
          <input
            type="text"
            className=" py-1 px-3 placeholder-gray-400 placeholder:text-sm caret-black outline-none rounded-full"
            placeholder="Search by ID"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>
        <ReactVirtualizedTable rows={modifiedData} columns={columns} />
      </div>
      <BasicPagination count={data.employeesCount} />
    </>
  );
};

export default Employees;
