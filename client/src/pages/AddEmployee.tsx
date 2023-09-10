import dayjs from "dayjs";
import { EmployeeForm as AddEmployeeForm } from "../components";

const AddEmployee = () => {
  return (
    <AddEmployeeForm
      url="/employees"
      method="POST"
      initialValues={{
        idNumber: "",
        idExpirationDate: dayjs(),
        name: "",
        nationality: "",
        passportNumber: "",
        passportExpirationDate: dayjs(),
        sponsor: "",
        workIn: "",
        agreementExpirationDate: dayjs(),
        status: "duty",
        licenseExpirationDate: dayjs(),
        licenseType: "Car",
      }}
    />
  );
};

export default AddEmployee;
