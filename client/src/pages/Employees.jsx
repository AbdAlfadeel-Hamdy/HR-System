import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import ReactVirtualizedTable from "../components/table/Table";
import BasicPagination from "../components/Pagination";

const Employees = () => {
  const { isFetching, data, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await customFetch.get("/employees");
      return data;
    },
  });
  // const queryClient = useQueryClient();
  // const { mutate } = useMutation({
  //   mutationFn: async (id) => {
  //     const { data } = await customFetch.delete(`/employees/${id}`);
  //     return data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["employees"],
  //     });
  //   },
  // });
  if (isFetching) return <div>Loading</div>;

  return (
    <>
      <ReactVirtualizedTable rows={data.employees} />
      <BasicPagination count={data.employeesCount} />
    </>
  );
};

export default Employees;
