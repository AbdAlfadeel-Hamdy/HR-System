import dayjs from "dayjs";
import { EmployeeForm } from "../components";

const AddEmployee = () => {
  return (
    <EmployeeForm
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
